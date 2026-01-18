# Product Requirements Document (PRD)

## 1. Product Information

**Product Name:** China Travel Decision Support App (MVP Core)
**Version:** PRD-001 v1.1
**Date:** 2026-01-08
**Author:** Product Team
**Stakeholders:** Product, Design, Engineering, Content

---

## 2. Executive Summary

A mobile-first web application that helps first-time visitors to China plan their trip through structured decision-making rather than infinite browsing. The product guides users through a curated question flow, then delivers customized destination and itinerary recommendations with clear explanations of why each option fits their specific inputs. This is a decision-support tool focused on reducing uncertainty and cognitive overload, not a content discovery platform or booking engine.

---

## 3. Background & Problem Statement

### Context
First-time visitors to China face overwhelming complexity when planning a trip:
- Vast geographic diversity (megacities, ancient towns, natural landscapes, cultural sites)
- Unfamiliar cultural and logistical context
- High cognitive load from generic travel content ("Top 10 places in China")
- Difficulty understanding what kind of trip is realistic for their time and interests
- Lack of structured guidance leads to either paralysis or poor decisions

Existing solutions fall short:
- Generic listicles provide inspiration but no decision clarity
- Booking platforms assume users already know where to go
- AI chatbots provide free-form recommendations without structure or explainability
- Discovery feeds encourage infinite browsing without commitment

### Problem
First-time visitors to China need help making confident decisions about where to go and what kind of journey to pursue, but current tools either overwhelm them with options or provide generic recommendations that don't account for their specific constraints and interests.

### User Pain Points
- **Uncertainty paralysis:** Too many options, no clear way to narrow down
- **Lack of customization:** Generic "top places" lists that don't reflect personal interests or constraints
- **Missing context:** Recommendations without explanation of WHY something fits
- **Hidden trade-offs:** Unrealistic itineraries that don't surface pacing, logistics, or seasonal constraints
- **Low confidence:** Unable to commit to a plan due to lack of trust in recommendations

---

## 4. Goals & Objectives

### Business Goals
- Create a differentiated decision-support product in the China travel planning space
- Build user trust through transparency and explainability
- Drive user commitment through structured guidance (measured by plan save/share rate)
- Establish a foundation for future monetization (partnerships, booking integration, premium features)

### User Goals
- Reduce planning time and cognitive load
- Receive customized recommendations that reflect personal inputs
- Understand WHY destinations and itineraries are recommended
- Feel confident committing to a travel plan
- Avoid common first-timer mistakes (unrealistic pacing, logistical complexity, seasonal issues)

### Success Metrics
| Metric | Target | Measurement Method |
|--------|--------|-------------------|
| Onboarding completion rate | >70% | Users who complete all 6 questions |
| Destination engagement rate | >50% | Users who tap to view at least 1 destination detail |
| Plan selection rate | >40% | Users who select at least 1 suggested itinerary |
| Plan save/export rate | >25% | Users who save or share a plan |
| Customization accuracy | 100% | No user receives identical recommendations for different inputs |

### Non-Goals (Out of Scope for MVP)
- **NOT a booking platform:** No direct booking of flights, hotels, or activities
- **NOT a content discovery feed:** No infinite scroll, no "inspiration" browsing
- **NOT a social platform:** No user-generated content, reviews, or community features
- **NOT a real-time travel assistant:** No in-trip support, navigation, or live updates
- **NOT a comprehensive guidebook:** No detailed attraction listings, opening hours, or pricing

---

## 5. Target Users

### Primary Users
**First-time China visitor with limited knowledge**
- Age: 25–55
- Planning phase: Early research (2–6 months before travel)
- Travel experience: Comfortable traveling internationally, but unfamiliar with China specifically
- Mindset: High uncertainty, seeking reassurance and structure
- Pain point: Overwhelmed by options, low confidence in self-directed planning

### User Characteristics
- Has fixed or semi-fixed time window (5–30 days typical)
- Wants personalized recommendations but lacks knowledge to self-direct
- Values transparency and explainability over opaque AI suggestions
- Prefers guided decision-making over open-ended exploration
- Needs realistic expectations about logistics, pacing, and trade-offs

---

## 6. User Stories & Use Cases

### User Story 1: Structured Onboarding
**As a** first-time visitor to China
**I want to** answer structured questions about my interests and constraints
**So that** I receive customized recommendations instead of generic lists

**Acceptance Criteria:**
- [ ] Each question appears on a separate screen (mobile-first, one at a time)
- [ ] Questions are presented in logical sequence (confirmation → interests → constraints)
- [ ] User cannot skip required questions
- [ ] User can navigate back to edit previous answers
- [ ] Progress indicator shows completion status (e.g., "3 of 6")
- [ ] All inputs are captured and passed to recommendation logic

### User Story 2: Destination Discovery
**As a** user who has completed onboarding
**I want to** view destination recommendations one at a time with clear explanations
**So that** I can evaluate each option without cognitive overload

**Acceptance Criteria:**
- [ ] Only ONE destination card is shown at a time (mobile-first, polaroid-style)
- [ ] Card displays: destination name, 2–3 suitability tags, one-line description
- [ ] User can tap card to view detailed explanation
- [ ] User can Skip or mark as Interested
- [ ] Recommendations are customized based on user inputs (different inputs = different destinations)
- [ ] No two users with different inputs receive identical destination sets

### User Story 3: Decision-Support Detail View
**As a** user considering a destination
**I want to** understand WHY this place fits my trip and what trade-offs exist
**So that** I can make an informed decision

**Acceptance Criteria:**
- [ ] Detail view opens as mobile sheet (not full-page navigation)
- [ ] Reduced hero image (25–30% screen height)
- [ ] Content blocks include: "Why people like this place," "Best time to visit," "Why this fits your trip," "Good to know"
- [ ] "Why this fits your trip" explicitly references user inputs (interests, pace, time)
- [ ] "Good to know" surfaces 2–3 realistic constraints or risks in neutral tone
- [ ] Sticky bottom actions: Back / Add to my trip

### User Story 4: Itinerary Plan Selection
**As a** user who has marked destinations as Interested
**I want to** choose from suggested itineraries that match my inputs and are realistically paced
**So that** I can see how destinations connect into a realistic journey without being overwhelmed or rushed

**Acceptance Criteria:**
- [ ] Multiple itinerary cards are displayed (concept-level overview)
- [ ] Each card shows: journey title, route (City → City → City), experience coverage pills, total days, pace
- [ ] User can tap a plan to view detailed explanation
- [ ] Plans are customized based on user inputs and interested destinations
- [ ] Different user inputs produce different plan recommendations
- [ ] All suggested itineraries MUST enforce realistic pacing constraints (adequate stay duration per destination, travel day accounting, limited city changes)
- [ ] Plans MUST NOT include unrealistic city-hopping patterns (e.g., one city per day, consecutive city changes)

### User Story 5: Itinerary Plan Detail
**As a** user evaluating an itinerary
**I want to** clearly understand why this route is structured this way, how each day and city fits together, what trade-offs I am making, and why the pacing is realistic
**So that** I can commit to a plan with confidence, decide whether this plan fits my time, interest, and travel styles

**Acceptance Criteria:**

**Detail View Structure:**
- [ ] Overview: High-level explanation of the itinerary logic and overall pacing and intent
- [ ] Route breakdown: City-by-city breakdown showing:
  - [ ] Stay length for each city (MUST be at least 1.5–2 days per destination, accounting for arrival days)
  - [ ] Role in journey (e.g., adaptation, contrast, nature, pacing) — each destination MUST have a defined role
  - [ ] Transport type and effort between cities (e.g., high-speed rail, flight, estimated duration)
  - [ ] Travel days clearly identified when inter-city travel exceeds 3 hours
- [ ] Good to know: Practical considerations and constraints
- [ ] Explanation & Trade-offs:
  - [ ] Explicitly surface trade-offs (e.g., variety vs depth, faster pace vs downtime)
  - [ ] Explain WHY these trade-offs were chosen
  - [ ] Explain WHY the pacing is structured as shown (e.g., arrival day recovery, travel day accounting, adequate exploration time)
  - [ ] All explanations must explicitly reference user inputs: selected interests, available time, pace preference

**Realistic Pacing Requirements:**
- [ ] Itinerary MUST NOT recommend changing cities on consecutive days more than once per trip
- [ ] Arrival day MUST be treated as partial or non-exploration day (acknowledged in day-level narrative)
- [ ] Inter-city travel over 3 hours MUST be reflected as a half or full travel day in the route breakdown
- [ ] Destination count MUST be constrained by trip duration (e.g., 7-day trip = max 3 destinations)
- [ ] If constraints conflict (too many interested destinations, too little time), itinerary MUST reduce destination count rather than compress stay duration

**Day-level Requirements (within each Day tab):**
- [ ] Each Day tab must include a day-level narrative header:
  - [ ] Title format: "Day X — City"
  - [ ] A short day theme or intent (e.g., "Arrival & First Impressions of Beijing")
  - [ ] One-sentence explanation of what this day is designed to achieve (e.g., settling in, easing pace, transitioning between contexts)
- [ ] Each day must present a structured list of itinerary items, where each item includes:
  - [ ] Category (e.g., Transport, Attraction, Food, Shopping)
  - [ ] Thumbnail image
  - [ ] Ordered index
  - [ ] Place name
  - [ ] One-line explanation of why this stop is included (concise)
- [ ] Show connection information between items:
  - [ ] Distance

### User Story 6: Share Itinerary
**As a** user
**I want to** share my itinerary with others
**So that** I can discuss and align plans easily

**Acceptance Criteria:**
- [ ] Share entry point is available in the itinerary top bar
- [ ] Tapping Share opens a bottom sheet (not full screen)
- [ ] User can choose:
  - [ ] Share overview
  - [ ] Share full itinerary
- [ ] Supported share formats:
  - [ ] Copy link
  - [ ] Save as image
  - [ ] Copy as text
- [ ] Shared itineraries are:
  - [ ] Read-only
  - [ ] Accessible without an account

---

## 7. Requirements

### 7.1 Functional Requirements

| ID    | Requirement                                                                                                                                    | Priority | Notes                                                     |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------- |
| FR-01 | Home screen communicates product value proposition in a logo, one short title, and subtitle, and displays single primary CTA: "Start Planning" | High     | Single-purpose entry point                                |
| FR-02 | Onboarding flow presents 6 questions, one per screen. Progress indicator shows current step out of total steps                                 | High     | Mobile-first, sequential                                  |
| FR-03 | Q1: First-time confirmation gate (Yes/No)                                                                                                      | High     | Users who select "No" are excluded from flow              |
| FR-04 | Q2: Interest selection (pill buttons, max 5 selections)                                                                                        | High     | 12 predefined interest options                            |
| FR-05 | Q3: Trip length selection (wheel picker for days)                                                                                              | High     | Wheel picker for selecting days                           |
| FR-06 | Q4: Travel pace selection (Slow / Balanced / Fast)                                                                                             | High     | Single-choice selector                                    |
| FR-07 | Q5: Planning effort tolerance (Low / Medium / High)                                                                                            | High     | Single-choice selector                                    |
| FR-08 | Q6: Weather & crowd flexibility (Flexible / Somewhat flexible / Comfort-focused)                                                               | High     | Single-choice selector                                    |
| FR-09 | Destination recommendations display ONE card at a time                                                                                         | High     | Mobile-first, polaroid-style                              |
| FR-10 | Destination card shows: name, 2–3 tags, one-line description, hint ("Tap to learn why this fits")                                              | High     | Minimal cognitive load                                    |
| FR-11 | Destination card actions: Skip / Interested                                                                                                    | High     | Binary choice, no neutral option                          |
| FR-12 | Tapping card opens destination detail sheet                                                                                                    | High     | Mobile sheet, not full-page nav                           |
| FR-13 | Destination detail includes 4 content blocks: "Why people like this," "Best time to visit," "Why this fits your trip," "Good to know"          | High     | Structured decision support                               |
| FR-14 | "Why this fits your trip" explicitly references user inputs                                                                                    | High     | Critical for trust and explainability                     |
| FR-15 | "Good to know" surfaces 2–3 realistic constraints in neutral tone                                                                              | High     | No alarmism, no sugar-coating                             |
| FR-16 | Destination detail has sticky bottom actions: Back / Add to my trip                                                                            | High     | Persistent decision actions                               |
| FR-17 | Itinerary plan cards display: journey title, route overview, experience pills, days, pace                                                      | High     | Concept-level overview                                    |
| FR-18 | Tapping plan card opens detailed explanation view                                                                                              | High     | Two-level structure                                       |
| FR-19 | Plan detail includes: Overview, Route breakdown, Good to know, Explanation & Trade-offs                                                        | High     | Structured explanation                                    |
| FR-20 | Route breakdown shows each city with stay length, role in journey, and transport details (type, estimated duration) between cities             | High     | Explainable journey structure with logistics transparency |
| FR-21 | Recommendations are customized: different inputs must produce different results                                                                | High     | Core product principle                                    |
| FR-22 | No user with different inputs receives identical destination or itinerary sets                                                                 | High     | Non-negotiable customization requirement                  |
| FR-23 | User can navigate back to edit previous onboarding answers                                                                                     | Medium   | Allows refinement                                         |
| FR-24 | Progress indicator shows onboarding completion (e.g., "3 of 6")                                                                                | Medium   | Reduces drop-off                                          |
| FR-25 | Hero images in destination detail are reduced size (25–30% screen height)                                                                      | Medium   | Content over visuals                                      |
| FR-26 | System generates itinerary explanation content based on route structure, city roles, and user inputs                                           | High     | Supports decision-support positioning                     |
| FR-27 | System explicitly surfaces trade-offs in itinerary explanations (e.g., variety vs depth, pace vs downtime)                                     | High     | Critical for informed decision-making                     |
| FR-28 | System produces day-level narrative content for each day: day theme (short label) and day intent (one sentence)                                | High     | Provides day-by-day context                               |
| FR-29 | System outputs itinerary items with required fields: category, order, title, short_description, image                                          | High     | Structured itinerary presentation                         |
| FR-30 | System outputs optional connection metadata between items when available: distance_km, duration_min, mode                                      | Medium   | Enhances logistics transparency                           |
| FR-31 | Share button is available in itinerary detail top bar                                                                                          | High     | Entry point for sharing                                   |
| FR-32 | Tapping Share opens bottom sheet with share options                                                                                            | High     | Mobile-first interaction pattern                          |
| FR-33 | User can select share scope: overview only or full itinerary                                                                                   | High     | Controlled sharing granularity                            |
| FR-34 | Share formats supported: Copy link, Save as image, Copy as text                                                                                | High     | Multiple use cases                                        |
| FR-35 | Shared itineraries are read-only and accessible without account                                                                                | High     | Scope-controlled sharing                                  |
| FR-36 | System MUST allocate at least 1.5–2 full days per destination in generated itineraries                                                         | High     | Prevents unrealistic pacing                               |
| FR-37 | System MUST treat arrival day as partial or non-exploration day in itinerary logic                                                             | High     | Realistic travel day accounting                           |
| FR-38 | System MUST account for inter-city travel over 3 hours as a half or full travel day                                                            | High     | Prevents underestimating travel impact                    |
| FR-39 | System MUST NOT recommend changing cities on consecutive days more than once per itinerary                                                     | High     | Prevents excessive city-hopping                           |
| FR-40 | System MUST constrain destination count based on trip duration (e.g., 7-day trip = max 3 destinations)                                         | High     | Enforces realistic scope                                  |
| FR-41 | System MUST assign a defined role to each destination in the journey (e.g., anchor, culture, nature, recovery)                                 | High     | Ensures intentional route structure                       |
| FR-42 | When constraints conflict (too many destinations for available time), system MUST reduce destination count rather than compress stay duration  | High     | Prioritizes quality over quantity                         |
| FR-43 | System MUST generate explanations for why pacing is structured as shown (arrival recovery, travel days, exploration time)                      | High     | Supports user understanding of constraints                |

### 7.2 Non-Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| NFR-01 | Mobile-first responsive design (320px–428px primary viewport) | High | Core device target |
| NFR-02 | Page load time <2 seconds on 4G connection | High | Performance threshold |
| NFR-03 | Onboarding flow supports back navigation without data loss | High | User can revise answers |
| NFR-04 | Recommendation logic produces explainable outputs | High | No black-box AI |
| NFR-05 | Content tone is calm, rational, and supportive (not marketing, not alarmist) | High | Brand voice |
| NFR-06 | All recommendation outputs are reproducible given same inputs | Medium | Consistency |
| NFR-07 | UI supports offline-first caching for onboarding flow | Low | Future enhancement |

---

## 8. Scope

### In Scope
- **Mobile-first web application**
    Responsive, optimized for mobile decision-making and swipe-based interaction.
- **Guided onboarding flow (6 questions)**
    Structured questions capturing:
    - First-time vs repeat visit
    - Interests (pill-based, max selection)
    - Time available
    - Pace preference
        Inputs are persisted within session and explicitly referenced later.
- **Customized destination recommendations (one-at-a-time card UI)**
    - Polaroid-style destination cards
    - One destination shown at a time
    - Recommendations are **strictly customized based on user inputs**, not generic or repeated
- **Destination detail views with decision-support content**
    Each destination detail includes:
    - Why people love this place
    - Best time to visit
    - Why this fits _your_ trip
    - Practical risks or constraints (e.g. transport effort, accessibility)
- **Suggested itinerary plans (two-level structure)**
    - **Plan overview level**: concept name, duration, route summary, intent
    - **Plan detail level**: explanation-focused itinerary breakdown
- **Itinerary plan detail as decision-support (not presentation)**
    Each itinerary detail includes:
    - Overview (route logic, pacing rationale)
    - Route breakdown (city-by-city with stay length, role in journey, transport type and effort)
    - Day-level tabs with:
        - Day narrative (theme + intent)
        - Structured itinerary items (category, image, description)
        - Optional between-item connection info (distance / time)
    - Explicit trade-offs (pace vs downtime, variety vs depth)
    - "Good to know" section (constraints, caveats)
    - **Realistic pacing constraints enforcement** (minimum stay duration, travel day accounting, limited city changes)
- **Explainable recommendation logic ("Why this fits")**
    All explanations must:
    - Reference user inputs (interests, time, pace)
    - Surface reasoning and trade-offs
    - Avoid marketing language
- **Share itinerary (read-only)**
    - Share button in itinerary detail top bar
    - Share options via bottom sheet:
        - Share overview (summary + route)
        - Share full itinerary (all days, places, transport)
    - Shared itineraries are read-only and do not require an account
- **Basic user state persistence (session-based)**
    - User answers and selected plans persist during session
    - No cross-device sync or account system in v1.1

### Out of Scope
- Booking integration (flights, hotels, activities)
- User accounts or authentication (MVP is session-based)
- Social features (reviews, community)
- In-trip support (navigation, live updates, chat)
- Detailed attraction information (opening hours, pricing, reviews)
- Multi-language support (English-only for MVP)
- Desktop-optimized experience (mobile-first, desktop-acceptable)
- Decision engine specification (logic defined in future PRD)
- AI role definition and responsibility boundaries (defined in future PRD)

### Future Considerations
- User accounts for plan persistence
- Email itinerary summary
- Partner booking integration (affiliate or API)
- Expanded content (city guides, attraction details)
- Multi-language support (Mandarin, Spanish, etc.)
- Community features (user reviews, trip reports)
- Collaborative planning features (multi-user editing)

---

## 9. Design & User Experience

### User Flow

**Primary Journey:**

1. **Home**
   - Hero section with value proposition
   - Single CTA: "Plan my first trip to China"

2. **Onboarding (6 screens, sequential)**
   - Screen 1: First-time confirmation (gate)
   - Screen 2: Interest selection (pill buttons, max 5)
   - Screen 3: Trip length (wheel picker or calendar)
   - Screen 4: Travel pace (Slow / Balanced / Fast)
   - Screen 5: Planning effort tolerance (Low / Medium / High)
   - Screen 6: Weather & crowd flexibility
   - Progress indicator: "Question X of 6"
   - Back navigation enabled (answers preserved)

3. **Destination Recommendations**
   - One card at a time (mobile-first, polaroid-style)
   - Card content: name, 2–3 tags, one-line description
   - Hint: "Tap to learn why this fits"
   - Actions: Skip / Interested
   - Tapping card opens detail sheet

4. **Destination Detail (Mobile Sheet)**
   - Reduced hero image (25–30% height)
   - Content blocks:
     - Why people like this place
     - Best time to visit
     - Why this fits your trip (personalized)
     - Good to know (constraints/trade-offs)
   - Sticky bottom: Back / Add to my trip

5. **Suggested Itineraries (Concept Level)**
   - Multiple cards displayed
   - Each card: journey title, route (City → City → City), experience pills, days, pace
   - All suggested itineraries enforce realistic pacing constraints
   - Tap to view plan detail

6. **Itinerary Plan Detail**
   - Top bar with Share button
   - Overview (what kind of journey, pacing, intent)
   - Route breakdown (city-by-city with stay length, role, transport details)
   - Explanation & Trade-offs (explicitly references user inputs and pacing rationale)
   - Good to know (constraints/trade-offs)
   - Day-level tabs with:
     - Day narrative header (theme, intent)
     - Structured itinerary items (category, image, order, name, description)
     - Connection information (distance)

7. **Share Itinerary (Bottom Sheet)**
   - Share scope selection: Overview / Full itinerary
   - Format options: Copy link / Save as image / Copy as text
   - Shared view is read-only, no account required

### Wireframes/Mockups
To be developed by Design team based on this PRD.

### Key UI Components
- **Onboarding Question Screen:** Title, subtitle, input control (pills/wheel/buttons), progress bar, Next/Back buttons
- **Destination Card:** Large card UI, hero image, title, tags, description, hint, Skip/Interested buttons
- **Destination Detail Sheet:** Modal/sheet overlay, hero image, content blocks (cards), sticky bottom actions
- **Itinerary Card:** Title, route visualization, pill tags, metadata (days, pace)
- **Itinerary Detail Screen:** Scrollable content, section headers, city breakdown, day tabs, structured item list
- **Day Tab Content:** Day header (theme + intent), itinerary item cards (category icon, image, order, name, description), connection indicators
- **Share Bottom Sheet:** Scope selector, format buttons, confirmation feedback

---

## 10. Technical Considerations

### Architecture
- **Frontend:** Mobile-first responsive web app (SPA or SSR)
- **Backend:** API server for recommendation logic, content delivery, and user session management
- **Content Management:** Structured content database (destinations, itineraries, explanations)
- **Recommendation Engine:** Logic layer that processes user inputs and returns customized results (algorithm TBD in future PRD)

### Technology Stack
- **Frontend:** React/Next.js (or similar modern framework), Tailwind CSS (or CSS-in-JS)
- **Backend:** Node.js/Express, Python/Flask, or Go (TBD based on team expertise)
- **Database:** PostgreSQL or MongoDB for structured content
- **Hosting:** Vercel, Netlify, or AWS (serverless or containerized)
- **APIs:** RESTful API or GraphQL for frontend-backend communication

### Dependencies
- Content authoring and management system (CMS or custom admin)
- Recommendation logic implementation (rules-based or hybrid AI)
- Image hosting and optimization (CDN)
- Analytics integration (user behavior tracking)
- Share link generation and storage system
- Image rendering service for "Save as image" functionality

### Integration Points
- None for MVP (booking, maps, weather APIs are out of scope)
- Future: Booking APIs, mapping APIs, weather data

---

## 12. Risks & Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Recommendation logic produces generic or identical results for different users | High | Medium | Implement strict validation tests; require recommendation outputs to differ for different input combinations; define clear customization rules |
| Onboarding drop-off rate exceeds 50% | High | Medium | A/B test question order and phrasing; minimize friction; show progress clearly; allow back navigation |
| Users distrust recommendations due to lack of transparency | High | Low | Ensure "Why this fits your trip" explicitly references user inputs; surface constraints in "Good to know"; avoid black-box AI |
| Content quality is inconsistent or inaccurate | Medium | Medium | Implement content review process; source from trusted references; establish tone and style guide |
| Mobile performance issues (slow load, laggy interactions) | Medium | Low | Optimize images; implement lazy loading; use performance monitoring tools |
| Users expect booking functionality (out of scope for MVP) | Medium | High | Clearly communicate product purpose on home screen; set expectations early; plan future booking integration |
| Insufficient destination or itinerary variety | Medium | Medium | Start with curated set (15–25 destinations, 8–12 itineraries); expand based on user demand patterns |
| Day-level content generation requires significant manual effort | Medium | Medium | Create reusable content templates; establish clear authoring guidelines; consider content generation assistance tools |
| Shared itineraries create unmanageable storage or performance burden | Low | Low | Implement share link expiration policy; use efficient storage format; monitor usage patterns |
| Pacing constraints reduce itinerary variety below user expectations | Medium | Medium | Communicate value of realistic pacing in explanations; educate users on travel fatigue risks; ensure remaining variety is high-quality |
| Users with many interested destinations receive fewer-than-expected itinerary options due to pacing constraints | Medium | High | Clearly explain in "Good to know" why fewer destinations = better experience; surface trade-offs transparently; allow users to refine interest selections |

---

## 13. Launch Plan

### Rollout Strategy
- **Phase 1: Internal Testing (Week 1–2)**
  - Team dogfooding and QA
  - Validate recommendation logic with test inputs
  - Ensure customization requirement is met
  - Test sharing functionality across formats
  - Validate pacing constraint enforcement across all itineraries

- **Phase 2: Closed Beta (Week 3–4)**
  - Invite 50–100 target users (first-time China travelers)
  - Collect qualitative feedback on onboarding, recommendations, and explainability
  - Track completion rates and engagement metrics
  - Test share feature adoption and formats used
  - Gather feedback on itinerary pacing and realism

- **Phase 3: Public Launch (Week 5+)**
  - Soft launch via social media, travel communities, SEO
  - Monitor performance, drop-off rates, and user feedback
  - Iterate on content and UX based on data

### Testing Plan
- **Unit testing:** Frontend components, backend API endpoints
- **Integration testing:** End-to-end user flows (onboarding → recommendations → plan selection → sharing)
- **User acceptance testing:** Beta testers validate that recommendations are customized and explainable
- **Performance testing:** Load time, mobile responsiveness, API response time
- **Customization validation:** Automated tests ensure different inputs produce different outputs
- **Share functionality testing:** Verify all share formats render correctly; test read-only access
- **Pacing constraint validation:** Automated tests ensure all generated itineraries meet minimum stay duration, travel day accounting, and city change limits

### Marketing/Communication Plan
- **Positioning:** "Stop browsing. Start deciding. A smarter way to plan your first trip to China."
- **Channels:** Travel subreddits, Facebook groups (China travel), SEO (first-time China travel keywords), travel blogs/partnerships
- **Messaging:** Emphasize decision support, customization, and explainability (not generic AI or listicles)

---

## 14. Open Questions

- [ ] What is the exact recommendation logic? (Rules-based, AI-assisted, hybrid?) → To be defined in future PRD
- [ ] How many destinations and itineraries should be included in MVP content set?
- [ ] Should users be able to edit their interests after onboarding, or must they restart?
- [ ] What analytics events should be tracked for recommendation performance evaluation?
- [ ] Should calendar input capture exact dates or just month/season?
- [ ] What is the fallback behavior if recommendation logic fails to produce customized results?
- [ ] Should "Interested" destinations be limited (e.g., max 5) to constrain itinerary generation?
- [ ] How should the product handle users who skip all destination recommendations?
- [ ] What is the expiration policy for shared itinerary links?
- [ ] Should shared itineraries include user input context (interests, pace, etc.) or only the output?
- [ ] How should day-level narrative content be authored and maintained at scale?
- [ ] What is the exact destination count formula for trips longer than 7 days? (e.g., 14-day trip = max 4-5 destinations?)
- [ ] How should the system handle edge cases where user interests span too many destination types for their available time?

---

## Approval Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | | | |
| Engineering Lead | | | |
| Design Lead | | | |
| Stakeholder | | | |

---

## Summary of Changes (v1.1 Update)

### What Changed
This update addresses a critical planning flaw discovered during implementation: the original PRD did not enforce realistic travel pacing constraints, allowing the system to generate unrealistic itineraries (e.g., one city per day, excessive city hopping).

### Constraints Added
1. **Minimum stay duration:** Each destination must occupy at least 1.5–2 full days
2. **Arrival day accounting:** Arrival day is treated as partial or non-exploration day
3. **Travel day impact:** Inter-city travel over 3 hours must be accounted for as a half or full travel day
4. **Limited city changes:** No more than one consecutive city change per itinerary
5. **Destination count limits:** Trip duration constrains destination count (e.g., 7-day trip = max 3 destinations)
6. **Defined destination roles:** Each destination must have an intentional role in the journey
7. **Conflict resolution priority:** When constraints conflict, reduce destination count rather than compress stay duration

### Sections Updated
- **User Story 4 (Itinerary Plan Selection):** Added acceptance criteria requiring realistic pacing enforcement
- **User Story 5 (Itinerary Plan Detail):** Added "Realistic Pacing Requirements" section with testable acceptance criteria; updated explanation requirements to include pacing rationale
- **Section 7.1 (Functional Requirements):** Added FR-36 through FR-43 to enforce pacing constraints at system level
- **Section 8 (Scope - In Scope):** Added realistic pacing constraints enforcement to itinerary plan detail scope
- **Section 9 (User Flow):** Updated step 5 to note pacing constraint enforcement
- **Section 12 (Risks & Mitigation):** Added two new risks related to pacing constraints and user expectations
- **Section 13 (Testing Plan):** Added pacing constraint validation testing requirement
- **Section 14 (Open Questions):** Added two new questions about destination count formulas and edge case handling

### Why This Change Was Necessary
Without enforceable pacing constraints, the recommendation system could generate itineraries that cause user frustration, travel fatigue, and low confidence in the product. These constraints ensure:
- Users receive realistic, actionable plans
- First-timer mistakes (rushed pacing, logistical complexity) are systematically avoided
- Product trust and commitment rates improve
- Future features remain consistent with realistic travel planning principles
