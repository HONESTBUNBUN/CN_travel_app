# Changelog

All notable changes to the China Travel App project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Phase 3: Itinerary Generation (Upcoming)
- Implement route builder using `transportConnections.json`
- Apply pacing constraints (FR-36 through FR-43)
- Use destination `role_options` for journey structure
- Generate day-by-day itineraries

---

## [2026-01-18] - Phase 2: Recommendations Migration

### Changed
- **`src/lib/recommendations.ts`**: Migrated from mock data to real dataset
  - Replaced `import { mockDestinations } from "@/data/mockDestinations"` with `import { destinations } from "@/data/destinationAdapter"`
  - Added `INTEREST_ID_TO_TAG` mapping constant to convert user interest IDs to destination interest tags
  - Added `mapInterestIdsToTags()` helper function
  - Updated filtering logic to use mapped interest tags
  - Updated scoring logic to use mapped interest tags
  - Fixed TypeScript errors for optional `destination.region` field (added fallback to 'Unknown')

### Added
- Interest ID to Tag mapping in recommendations logic:
  ```typescript
  const INTEREST_ID_TO_TAG: Record<string, string> = {
    'ancient-history-culture': 'Ancient History & Culture',
    'modern-architecture': 'Modern Architecture & City Life',
    'natural-landscapes': 'Natural Landscapes & Hiking',
    'food-culinary': 'Food & Culinary Experiences',
    'traditional-arts': 'Traditional Arts & Crafts',
    'religious-spiritual': 'Religious & Spiritual Sites',
    'ethnic-minorities': 'Ethnic Minorities & Local Culture',
    'photography-scenic': 'Photography & Scenic Views',
    'shopping-markets': 'Shopping & Markets',
    'nightlife-entertainment': 'Nightlife & Entertainment',
    'museums-exhibitions': 'Museums & Exhibitions',
    'adventure-outdoor': 'Adventure & Outdoor Activities',
  };
  ```

### Technical Details
- **Data source change**: From 33 mock destinations to 20 PRD-compliant destinations from `destinations.json`
- **Interest matching**: User selects interest IDs (e.g., `"ancient-history-culture"`), which are mapped to interest tags (e.g., `"Ancient History & Culture"`) stored in the dataset
- **Region handling**: Added fallback to `'Unknown'` for destinations without region data

### Files Modified
| File | Change |
|------|--------|
| `src/lib/recommendations.ts` | Migrated to real dataset with interest mapping |
| `MIGRATION_GUIDE.md` | Updated Phase 2 status to complete |

### Tested
- Onboarding flow with 12 new interests
- Recommendations page displays destinations from real dataset
- Interest filtering works correctly
- "Why this fits" explanations reference user inputs
- Max 5 "Interested" destinations enforced
- Geographic diversity in recommendations

---

## [2026-01-17] - Phase 1: Onboarding Interests Update

### Changed
- **`src/types/index.ts`**: Updated `INTERESTS` constant with 12 PRD v1.3 predefined options

### Added
- 12 new interest options:
  1. Ancient History & Culture
  2. Modern Architecture & City Life
  3. Natural Landscapes & Hiking
  4. Food & Culinary Experiences
  5. Traditional Arts & Crafts
  6. Religious & Spiritual Sites
  7. Ethnic Minorities & Local Culture
  8. Photography & Scenic Views
  9. Shopping & Markets
  10. Nightlife & Entertainment
  11. Museums & Exhibitions
  12. Adventure & Outdoor Activities

---

## [2026-01-08] - Initial Implementation

### Added
- Project foundation with Next.js 15, TypeScript, Tailwind CSS
- Design system matching Figma specs
- Home page with "Start planning" CTA
- Onboarding flow (Q1-Q6)
- Destination recommendations (one-card-at-a-time UI)
- Destination detail sheet with 4 content blocks
- 33 mock destinations with content
- Recommendation scoring logic
- Zustand state management with persistence

### Documentation
- Created `IMPLEMENTATION_STATUS.md`
- Created `LOGIC_FIXES.md`
- Created `MIGRATION_GUIDE.md`

---

## PRD Compliance Progress

| Requirement | Status | Date |
|-------------|--------|------|
| FR-01: Home with single CTA | Complete | 2026-01-08 |
| FR-02: 6-question onboarding | Complete | 2026-01-08 |
| FR-03: First-time gate | Complete | 2026-01-08 |
| FR-04: Interest selection (max 5 from 12) | Complete | 2026-01-17 |
| FR-05: Trip length picker | Complete | 2026-01-08 |
| FR-06: Pace selection | Complete | 2026-01-08 |
| FR-07: Planning effort | Complete | 2026-01-08 |
| FR-08: Weather flexibility | Complete | 2026-01-08 |
| FR-09: One card at a time | Complete | 2026-01-08 |
| FR-10: Card content | Complete | 2026-01-08 |
| FR-11: Skip / Interested | Complete | 2026-01-08 |
| FR-12: Detail sheet | Complete | 2026-01-08 |
| FR-13: 4 content blocks | Complete | 2026-01-08 |
| FR-14: "Why this fits" references inputs | Complete | 2026-01-18 |
| FR-15: "Good to know" constraints | Complete | 2026-01-08 |
| FR-16: Sticky bottom actions | Complete | 2026-01-08 |
| FR-17-20: Itinerary features | In Progress | - |
| FR-21: Personalization | Complete | 2026-01-18 |
| FR-22: Reproducible outputs | Complete | 2026-01-18 |
| FR-48: Max 5 interested | Complete | 2026-01-08 |
| FR-49: Structured JSON dataset | Complete | 2026-01-18 |

---

## Migration Status

| Phase | Status | Date |
|-------|--------|------|
| Phase 1: Onboarding | Complete | 2026-01-17 |
| Phase 2: Recommendations | Complete | 2026-01-18 |
| Phase 3: Itinerary Generation | Pending | - |
| Phase 4: Explanation Generation | Pending | - |
| Phase 5: Production Ready | Pending | - |
