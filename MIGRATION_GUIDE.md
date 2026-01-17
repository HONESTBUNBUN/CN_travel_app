# Dataset Migration Guide

## Quick Start: Test the New Dataset

### Step 1: Update Onboarding Q2 Interests

**File:** `/src/app/onboarding/q2/page.tsx`

**Find:**
```typescript
import { INTERESTS } from "@/types";
```

**Status:** Already using the updated `INTERESTS` constant from `/src/types/index.ts` which now includes the 12 predefined options from PRD v1.3.

**Verify it displays:**
1. Ancient History & Culture 🏛️
2. Modern Architecture & City Life 🌃
3. Natural Landscapes & Hiking ⛰️
4. Food & Culinary Experiences 🍜
5. Traditional Arts & Crafts 🎨
6. Religious & Spiritual Sites 🏯
7. Ethnic Minorities & Local Culture 🏘️
8. Photography & Scenic Views 📸
9. Shopping & Markets 🛍️
10. Nightlife & Entertainment 🎭
11. Museums & Exhibitions 🏛️
12. Adventure & Outdoor Activities 🧗

### Step 2: Test Destination Adapter

**Option A: Test in Recommendations Page**

**File:** `/src/app/recommendations/page.tsx`

```typescript
// OLD (mock data):
// import { mockDestinations } from "@/data/mockDestinations";

// NEW (adapter using real dataset):
import { destinations } from "@/data/destinationAdapter";

// Use 'destinations' instead of 'mockDestinations'
```

**Option B: Test Side-by-Side**

```typescript
import { mockDestinations } from "@/data/mockDestinations";
import { destinations as realDestinations } from "@/data/destinationAdapter";

console.log('Mock count:', mockDestinations.length); // 30+
console.log('Real count:', realDestinations.length); // 20
console.log('Real cities:', realDestinations.map(d => d.name));
```

### Step 3: Validate the Recommendation Flow

1. **Start the app**: `npm run dev`
2. **Complete onboarding** with new interests
3. **View recommendations** - should show 20 cities from dataset
4. **Check destination details** - verify "Why this fits" references your inputs
5. **Mark interested** - max 5 destinations enforced

## Full Migration Checklist

### Phase 1: Onboarding (Immediate)
- [x] Update `INTERESTS` constant (already done in `/src/types/index.ts`)
- [ ] Test Q2 displays 12 new interests correctly
- [ ] Verify interest IDs saved match new format

### Phase 2: Recommendations (Week 1)
- [ ] Replace `mockDestinations` with adapter in recommendations page
- [ ] Test filtering by interests works
- [ ] Verify "Why this fits" generates correctly
- [ ] Test "Interested" limit of 5 destinations

### Phase 3: Itinerary Generation (Week 2)
- [ ] Implement route builder using `transportConnections.json`
- [ ] Apply pacing constraints (FR-36 through FR-43)
- [ ] Use destination `role_options` for journey structure
- [ ] Generate day-by-day itineraries

### Phase 4: Explanation Generation (Week 3)
- [ ] Integrate AI for "Why this fits" explanations
- [ ] Generate trade-off explanations
- [ ] Create day-level narratives
- [ ] Validate explanations reference user inputs

### Phase 5: Production Ready (Week 4)
- [ ] Remove mock data files
- [ ] Add tests for recommendation engine
- [ ] Document recommendation logic
- [ ] Performance optimization

## Common Migration Patterns

### Pattern 1: Basic Destination List

**Before:**
```typescript
import { mockDestinations } from "@/data/mockDestinations";

const destinations = mockDestinations;
```

**After:**
```typescript
import { destinations } from "@/data/destinationAdapter";
// destinations is already exported as array
```

### Pattern 2: Destination Lookup by ID

**Before:**
```typescript
const dest = mockDestinations.find(d => d.id === 'beijing');
```

**After:**
```typescript
import { destinationsById } from "@/data/destinationAdapter";

const dest = destinationsById['beijing'];
```

### Pattern 3: Filtering by Interest

**Before:**
```typescript
const filtered = mockDestinations.filter(d =>
  d.matchingInterests.some(interest =>
    userInputs.interests.includes(interest)
  )
);
```

**After (same, adapter handles mapping):**
```typescript
import { destinations } from "@/data/destinationAdapter";

const filtered = destinations.filter(d =>
  d.matchingInterests.some(interest =>
    userInputs.interests.includes(interest)
  )
);
```

### Pattern 4: Direct JSON Access (Future)

**When ready to bypass adapter:**
```typescript
import destinationsJson from '@/data/destinations.json';
import type { DestinationData } from '@/types';

const beijing: DestinationData = destinationsJson.destinations.find(
  d => d.destination_id === 'beijing'
)!;

console.log(beijing.name_cn); // "北京"
console.log(beijing.min_recommended_stay_days); // 3.0
console.log(beijing.interest_tags); // ["Ancient History & Culture", ...]
```

## Interest Tag Mapping Reference

The adapter automatically maps between old interest IDs and new interest tags:

| Old Interest ID | New Interest Tag |
|----------------|------------------|
| `temples` | Religious & Spiritual Sites |
| `ancient-cities` | Ancient History & Culture |
| `pandas` | Museums & Exhibitions |
| `mountains` | Natural Landscapes & Hiking |
| `street-food` | Food & Culinary Experiences |
| `city-skylines` | Modern Architecture & City Life |
| `night-markets` | Shopping & Markets |
| `tea-culture` | Traditional Arts & Crafts |
| `high-speed-trains` | Modern Architecture & City Life |

**New interest IDs (recommended for new code):**
- `ancient-history-culture`
- `modern-architecture`
- `natural-landscapes`
- `food-culinary`
- `traditional-arts`
- `religious-spiritual`
- `ethnic-minorities`
- `photography-scenic`
- `shopping-markets`
- `nightlife-entertainment`
- `museums-exhibitions`
- `adventure-outdoor`

## Testing Checklist

### Unit Tests Needed
- [ ] Adapter converts all 20 destinations without errors
- [ ] Interest mapping works for all 12 interests
- [ ] Generated "Why this fits" references user inputs
- [ ] Pace mapping (slow/balanced/fast) works correctly

### Integration Tests Needed
- [ ] Onboarding → Recommendations flow
- [ ] Interest selection → Filtered destinations
- [ ] "Interested" limit enforcement (max 5)
- [ ] Destination detail view displays correctly

### Validation Tests
- [ ] Run `npx tsx scripts/validate-dataset.ts` passes
- [ ] All 380 transport connections valid
- [ ] No missing destination IDs in connections
- [ ] All interest tags recognized

## Rollback Plan

If issues arise during migration:

1. **Revert to mock data:**
   ```typescript
   import { mockDestinations } from "@/data/mockDestinations";
   ```

2. **Keep new INTERESTS but use old data:**
   The new interests are backward compatible - old destinations can still use them.

3. **Gradual rollout:**
   - Week 1: New interests only
   - Week 2: New interests + adapter for 20 cities
   - Week 3: Full dataset + recommendation engine
   - Week 4: Remove mock data

## Performance Considerations

### Current (Mock Data)
- 30+ destinations loaded in memory
- No validation overhead
- Functions executed on-demand

### After Migration (Real Dataset)
- 20 destinations (smaller dataset)
- JSON parsing minimal (~50KB file)
- Adapter runs once at import
- Transport connections (~100KB) loaded on-demand

**Impact:** Negligible - should be faster due to smaller dataset.

## Support

### Questions?
1. Check [DATASET_IMPLEMENTATION.md](./DATASET_IMPLEMENTATION.md) for dataset structure
2. Check [PRD v1.3](/.claude/docs/PRD/PRD-001_MVP_Core_v1.3.md) Section 10.6 for schema
3. Run validation script: `npx tsx scripts/validate-dataset.ts`

### Issues?
1. Verify dataset validates: `npx tsx scripts/validate-dataset.ts`
2. Check adapter mappings in `/src/data/destinationAdapter.ts`
3. Test with single destination first before full replacement

## Next Steps After Migration

Once migration is complete:

1. **Implement Recommendation Engine**
   - Use destination `interest_tags` for matching
   - Apply `primary_cluster` diversity constraints (max 40% per cluster)
   - Calculate scores using PRD scoring formula

2. **Build Itinerary Generator**
   - Use `transportConnections.json` for routing
   - Apply pacing constraints (FR-36 through FR-43)
   - Assign destination roles (anchor, culture, nature, recovery, contrast)

3. **Generate AI Explanations**
   - Replace adapter's simple `generateWhyThisFits`
   - Create trade-off explanations
   - Generate day-level narratives

4. **Add Rules Audit**
   - Implement validation for generated itineraries
   - Output rules_audit JSON for testing
   - Validate against FR-36 through FR-43

Good luck with the migration! 🚀
