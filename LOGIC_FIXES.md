# Logic Fixes & Itinerary Planning - Implementation Summary

**Date:** 2026-01-08

## 1. Destination Image Handling ✅ FIXED

### Problem
- Images were generic stock photos, lifestyle shots, or unrelated
- No fallback logic for missing/broken images
- People in photos (violates product requirement)

### Solution Implemented

**Curated Image Mapping** ([src/data/destinationImages.ts](src/data/destinationImages.ts))
- Created mapping for all 33 destinations
- Each destination has:
  - **Primary photo ID** - Best landmark/landscape shot
  - **Backup photo ID** - Secondary option
  - **Keywords** - For dynamic search fallback (not yet implemented)

**Image Selection Rules:**
1. Use curated primary photo ID
2. If fails, use backup photo ID
3. If still fails, use placeholder
4. Reject images with people keywords in alt_description

**People Detection:**
Keywords rejected: `person`, `people`, `portrait`, `woman`, `man`, `model`, `tourist`, `traveler`, `face`, `crowd`, `human`

**Fallback Chain:**
```
Curated Primary → Backup → Dynamic Search (future) → Placeholder
```

All images updated to use: `getUnsplashUrl(DESTINATION_IMAGES[id].primary)`

---

## 2. Recommendation Logic ✅ FIXED

### Problem
- Recommended 28 destinations (way too many)
- No proper filtering by interests
- Missing prioritization logic

### Solution Implemented

**New Logic** ([src/lib/recommendations.ts](src/lib/recommendations.ts))

#### Step 1: Filter by Interests
- **Must match at least 1 selected interest pill**
- Max 5 interest pills (enforced in Q2)
- Max 8 destination cards returned

#### Step 2: Scoring System

**Popularity (40% weight):**
- First-time major destinations: +10 pts (Beijing, Shanghai, Xi'an, etc.)
- UNESCO sites: +8 pts
- High-speed rail accessible: +5 pts

**Geographic Diversity (35% weight):**
- New region: +10 pts
- Second from region: +5 pts
- Third+ from region: -5 pts (penalty)

**Interest Match Strength (25% weight):**
- +5 pts per matching interest
- +3 bonus if matches first interest (top priority)

**Bonus Scoring:**
- Pace match: +5 pts
- Planning effort match: +3 pts

#### Step 3: Prioritization
- Sort by total score
- Apply diversity while selecting top 8
- Alternate regions in display order (avoid clustering)

#### Step 4: Relaxation (if < 3 matches)
- Include nearby destinations from same regions
- Show message: "We found X matches. We've included nearby destinations..."

#### Example Scoring:
```
User selects: pandas, mountains, temples | balanced pace | medium effort

Beijing:
  - Popularity: 10 pts × 0.4 = 4.0
  - Diversity: 10 pts × 0.35 = 3.5 (first North destination)
  - Interest: 10 pts × 0.25 = 2.5 (temples match)
  - Pace: +5 (balanced matches)
  - Effort: +2 (medium)
  Total: 17.0 pts

Chengdu:
  - Popularity: 10 pts × 0.4 = 4.0
  - Diversity: 10 pts × 0.35 = 3.5 (first West destination)
  - Interest: 13 pts × 0.25 = 3.25 (pandas + temples)
  - Pace: +5
  - Effort: +2
  Total: 17.75 pts (higher due to double match)
```

**Updated API Response:**
```typescript
{
  destinations: Destination[], // Max 8
  relaxedFilter: boolean,
  message?: string
}
```

---

## 3. Itinerary Planning Module ✅ DEFINED

### Data Structure

**Type Definitions** ([src/types/itinerary.ts](src/types/itinerary.ts))

```typescript
interface ItineraryPlan {
  id: string;
  name: string; // "Balanced Explorer", "Nature Immersion"
  theme: "balanced" | "nature-focused" | "cities-first" | "culture-deep-dive";
  tagline: string;

  totalDays: number;
  totalNights: number;
  destinationIds: string[];

  route: RouteSegment[];
  bestFor: { pace, interests, tripLength };
  tradeoffs: string[];
  stats: { totalFlights, totalTrainRides, lightDays, moderateDays, packedDays };
}

interface RouteSegment {
  destinationId: string;
  nights: number;
  arrivalDay: number;
  departureDay: number;
  role: "arrival-city" | "main-destination" | "departure-city";
  nextTransport: TransportConnection | null;
  days: DayPlan[];
}

interface DayPlan {
  dayNumber: number; // Overall trip day
  localDay: number; // Day within this destination
  theme: string; // "Arrival & Orientation", "Temple exploration"
  intent: string; // Why structured this way
  items: string[]; // High-level activities
  pace: "light" | "moderate" | "packed";
  notes?: string;
}
```

### Generation Logic

**Algorithm** ([src/lib/itineraryGenerator.ts](src/lib/itineraryGenerator.ts))

**Input:**
- Selected interested destinations (from recommendations page)
- User inputs (trip length, pace, interests)

**Output:**
- 3-4 automatic itinerary options

**Constraints Applied:**

1. **Max 1 long-distance transfer every 2-3 days**
   - Long-distance = flight or >4h train
   - After long travel, next day is light pace

2. **Pacing Logic:**
   - Day 1 (arrival): Always light
   - Travel days: Count as activity
   - Every 4-5 days: Rest buffer (light day)
   - Last day: Light (departure prep)

3. **Geographic Clustering:**
   - Route order: North → East → South → West → Central
   - Avoids zigzagging across country

4. **Night Allocation:**
   - Minimum nights = destination.minimumDays - 1
   - +1 night if 3+ interests match
   - First city gets minimum 2 nights
   - Last city adjusted to fit trip length

**4 Itinerary Options:**

1. **Balanced Explorer** (uses all/most interested destinations)
   - Max 5 destinations
   - Mix of everything

2. **Nature Immersion** (filters for nature interests)
   - Mountains, national-parks, pandas
   - Max 4 destinations

3. **Urban Explorer** (filters for city interests)
   - City-skylines, ancient-cities, street-food, night-markets
   - Max 4 destinations

4. **Cultural Journey** (filters for culture interests)
   - Temples, classical-gardens, tea-culture, ancient-cities
   - Max 4 destinations

**Deduplication:** Removes identical itineraries (same destination combo)

---

## Example Generated Itinerary

**Input:**
- Interested destinations: Beijing, Xi'an, Shanghai
- Trip length: 10 days
- Pace: balanced
- Interests: temples, ancient-cities

**Output: "Balanced Explorer"**

```
Theme: balanced
Total: 10 days, 9 nights, 3 cities

Route:
  Beijing (3N) → Xi'an (3N) → Shanghai (2N)

Day-by-Day Breakdown:

Day 1 (Beijing): Arrival & Orientation [Light]
  - Arrive in Beijing
  - Check into hotel
  - Evening walk around neighborhood

Day 2 (Beijing): Temples & Spiritual Sites [Moderate]
  - Morning: Visit Temple of Heaven
  - Afternoon: Explore Lama Temple
  - Evening: Traditional tea ceremony

Day 3 (Beijing): Historical & Cultural Exploration [Moderate]
  - Morning: Forbidden City walk
  - Lunch: Local specialty
  - Afternoon: Summer Palace

Day 4 (Beijing): Nature & Scenic Areas [Packed]
  - Full day: Great Wall day trip
  - Packed lunch
  - Return by evening

Day 5: Travel to Xi'an (5h high-speed train) [Travel Day]

Day 6 (Xi'an): Arrival & Orientation [Light]
  - Arrive in Xi'an
  - Check into hotel
  - Evening walk on City Wall

Day 7 (Xi'an): Historical & Cultural Exploration [Packed]
  - Full day: Terracotta Warriors
  - Return by evening

Day 8 (Xi'an): Food & Local Life [Moderate]
  - Morning: Muslim Quarter market
  - Afternoon: Bike ride on City Wall
  - Evening: Night market exploration

Day 9: Travel to Shanghai (6h train) [Travel Day]

Day 10 (Shanghai): Departure [Light]
  - Morning: Quick Bund walk
  - Departure prep

Tradeoffs:
  - Fast-paced in Beijing to fit Great Wall
  - Limited time in Shanghai (departure city)

Stats:
  - 0 flights, 2 train rides
  - 3 light days, 3 moderate days, 2 packed days, 2 travel days
```

---

## Testing Recommendations

### Test Cases for Recommendation Logic:

1. **Single Interest** (pandas):
   - Should return only Chengdu + maybe Jiuzhaigou
   - Max 8 destinations

2. **Multiple Interests** (mountains + temples):
   - Should return mix: Huangshan, Zhangjiajie, Beijing, Xi'an, etc.
   - Geographic diversity across regions
   - Max 8 destinations

3. **Rare Interest Combo** (high-speed-trains only):
   - Should trigger relaxation
   - Show message about limited matches

4. **All 5 Interests**:
   - Should still max out at 8 destinations
   - Prioritize by popularity + diversity

### Test Cases for Itinerary Generation:

1. **2 Destinations** (Beijing + Shanghai):
   - Should generate 10-day balanced plan
   - 4-5 nights each
   - One train connection

2. **5 Destinations** (all major cities):
   - Should warn about fast pace
   - Multiple travel days
   - Tradeoff: "Limited time per city"

3. **Nature-Only** (Guilin, Zhangjiajie, Jiuzhaigou):
   - Should generate Nature Immersion plan
   - Slower pace, packed days for hiking
   - Flights required (remote locations)

---

## Next Steps

### To Complete Itinerary Module:

1. **Update itineraries page** ([src/app/itineraries/page.tsx](src/app/itineraries/page.tsx))
   - Call `generateItineraries()` with interested destinations
   - Display 3-4 itinerary cards
   - Show stats and tradeoffs

2. **Create itinerary detail page** ([src/app/itineraries/[id]/page.tsx](src/app/itineraries/[id]/page.tsx))
   - Full day-by-day breakdown
   - Route map visualization (optional)
   - Share functionality

3. **Store selected itinerary** in Zustand
   - Add to useAppStore
   - Persist selection

4. **Test with real user flows**
   - Complete onboarding
   - Mark 3-5 destinations as interested
   - View generated itineraries

---

## Files Changed

### Created:
- `src/data/destinationImages.ts` - Curated image mapping
- `src/types/itinerary.ts` - Itinerary type definitions
- `src/lib/itineraryGenerator.ts` - Generation logic

### Modified:
- `src/data/mockDestinations.ts` - Uses curated images
- `src/lib/recommendations.ts` - New scoring algorithm
- `src/app/recommendations/page.tsx` - Uses new API response

---

**Status:** Ready for UI implementation of itinerary pages
**Next:** Build itineraries list and detail screens
