# Product Requirements Document (PRD)

## 1. Product Information

**Product Name:** China Travel Decision Support App (MVP Core)
**Version:** PRD-001 v1.3
**Date:** 2026-01-17
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
| Personalization sensitivity | >0.2 Jaccard distance on key input changes | When users change ≥2 key inputs (interests, pace, trip length), top 10 destination recommendations must differ by ≥20% (Jaccard similarity <0.8); identical inputs produce identical outputs |

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
- [ ] Recommendations are customized based on user inputs (different key inputs produce measurably different destination sets)
- [ ] When users change ≥2 key inputs (interests, pace, trip length), top 10 recommendations must differ by ≥20%

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
- [ ] Different key inputs produce measurably different plan recommendations
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
  - [ ] Distance (distance_km)
  - [ ] Estimated duration (duration_min)
  - [ ] Transport mode (mode: e.g., walk, taxi, subway)

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
| FR-04 | Q2: Interest selection (pill buttons, max 5 selections from 12 predefined options)                                                            | High     | 12 predefined interest options (see Section 10.5)         |
| FR-05 | Q3: Trip length selection (wheel picker for days)                                                                                              | High     | Wheel picker only for MVP; calendar/date selection is future enhancement |
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
| FR-21 | Recommendations are personalized: when users change ≥2 key inputs (interests, pace, trip length), top 10 destination recommendations must differ by ≥20% (Jaccard similarity <0.8) | High | Measurable personalization threshold |
| FR-22 | Recommendation engine outputs are reproducible: identical user inputs MUST produce identical destination sets and itinerary structures across sessions | High | Deterministic outputs for identical inputs |
| FR-23 | User can navigate back to edit previous onboarding answers                                                                                     | Medium   | Allows refinement                                         |
| FR-24 | Progress indicator shows onboarding completion (e.g., "3 of 6")                                                                                | Medium   | Reduces drop-off                                          |
| FR-25 | Hero images in destination detail are reduced size (25–30% screen height)                                                                      | Medium   | Content over visuals                                      |
| FR-26 | System generates itinerary explanation content based on route structure, city roles, and user inputs                                           | High     | Supports decision-support positioning                     |
| FR-27 | System explicitly surfaces trade-offs in itinerary explanations (e.g., variety vs depth, pace vs downtime)                                     | High     | Critical for informed decision-making                     |
| FR-28 | System produces day-level narrative content for each day: day theme (short label) and day intent (one sentence)                                | High     | Provides day-by-day context                               |
| FR-29 | System outputs itinerary items with required fields: category, order, title, short_description, image                                          | High     | Structured itinerary presentation                         |
| FR-30 | System outputs connection metadata between itinerary items: distance_km, duration_min, mode (e.g., walk, taxi, subway, train, flight)         | High     | Enhances logistics transparency                           |
| FR-31 | Share button is available in itinerary detail top bar                                                                                          | High     | Entry point for sharing                                   |
| FR-32 | Tapping Share opens bottom sheet with share options                                                                                            | High     | Mobile-first interaction pattern                          |
| FR-33 | User can select share scope: overview only or full itinerary                                                                                   | High     | Controlled sharing granularity                            |
| FR-34 | Share formats supported: Copy link, Save as image, Copy as text                                                                                | High     | Multiple use cases                                        |
| FR-35 | Shared itineraries are read-only and accessible without account                                                                                | High     | Scope-controlled sharing                                  |
| FR-36 | System MUST allocate at least 1.5–2 full days per destination in generated itineraries                                                         | High     | Prevents unrealistic pacing                               |
| FR-37 | System MUST treat arrival day as partial or non-exploration day in itinerary logic                                                             | High     | Realistic travel day accounting                           |
| FR-38 | System MUST account for inter-city travel over 3 hours as a half or full travel day                                                            | High     | Prevents underestimating travel impact                    |
| FR-39 | System MUST NOT recommend changing cities on consecutive days more than once per itinerary                                                     | High     | Prevents excessive city-hopping                           |
| FR-40 | System MUST constrain destination count based on trip duration using formula: max_destinations = ceil(trip_days / 2.5) + 1                    | High     | Enforces realistic scope (7d=3, 14d=6, 21d=9)            |
| FR-41 | System MUST assign a defined role to each destination in the journey (e.g., anchor, culture, nature, recovery)                                 | High     | Ensures intentional route structure                       |
| FR-42 | When constraints conflict (too many destinations for available time), system MUST reduce destination count rather than compress stay duration  | High     | Prioritizes quality over quantity                         |
| FR-43 | System MUST generate explanations for why pacing is structured as shown (arrival recovery, travel days, exploration time)                      | High     | Supports user understanding of constraints                |
| FR-44 | System MUST output a rules_audit record for each generated itinerary showing: constraint validation results, structure compliance check, feasibility confirmation | High | Enables testing, debugging, and quality assurance |
| FR-45 | All AI-generated explanation content MUST include traceable references to specific user inputs (interests, pace, time) and itinerary properties (stay length, roles, transport) | High | Prevents generic or hallucinated explanations |
| FR-46 | System MUST validate AI-generated explanation content does not contradict itinerary constraints (e.g., claiming "slow pace" when itinerary has consecutive city changes) | High | Maintains explanation consistency and trust |
| FR-47 | Scoring and ranking logic MUST use deterministic, explainable preference weights (no black-box ML models for candidate selection or itinerary structure) | High | Core product principle: transparency over optimization |
| FR-48 | System MUST limit "Interested" destination selections to maximum 5 destinations                                                                | High     | Forces prioritization, prevents scope creep              |
| FR-49 | Destination content MUST be stored as structured JSON dataset with all required schema fields (see Section 10.6)                               | High     | MVP content strategy: structured data over long-form     |
| FR-50 | Transport connection data MUST include full mesh coverage for all 20 MVP destinations (380 city pairs)                                         | High     | Enables flexible route generation                        |

### 7.2 Non-Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| NFR-01 | Mobile-first responsive design (320px–428px primary viewport) | High | Core device target |
| NFR-02 | Page load time <2 seconds on 4G connection | High | Performance threshold |
| NFR-03 | Onboarding flow supports back navigation without data loss | High | User can revise answers |
| NFR-04 | Recommendation logic produces explainable outputs | High | No black-box AI |
| NFR-05 | Content tone is calm, rational, and supportive (not marketing, not alarmist) | High | Brand voice |
| NFR-06 | All recommendation outputs are reproducible given same inputs | High | Consistency |
| NFR-07 | UI supports offline-first caching for onboarding flow | Low | Future enhancement |
| NFR-08 | Destination dataset MUST pass validation script checking all required schema fields | High | Data quality gate |

---

## 8. Scope

### In Scope
- **Mobile-first web application**
    Responsive, optimized for mobile decision-making and swipe-based interaction.
- **Guided onboarding flow (6 questions)**
    Structured questions capturing:
    - First-time vs repeat visit
    - Interests (pill-based, max 5 selections from 12 predefined options)
    - Time available (wheel picker for MVP)
    - Pace preference
    - Planning effort tolerance
    - Weather & crowd flexibility
        Inputs are persisted within session and explicitly referenced later.
- **Customized destination recommendations (one-at-a-time card UI)**
    - Polaroid-style destination cards
    - One destination shown at a time
    - Recommendations are **strictly personalized based on user inputs** with measurable sensitivity (Jaccard distance ≥0.2 on key input changes)
    - Maximum 5 "Interested" destination selections enforced
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
        - Connection info (distance_km, duration_min, mode)
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
    - No cross-device sync or account system in v1.3
- **Hybrid rules-first recommendation engine (v0)**
    - Rules-based feasibility layer enforcing pacing constraints (FR-36~FR-43)
    - Deterministic preference scoring and ranking
    - Bounded AI role for explanation generation only
    - Reproducible outputs for identical inputs
    - Personalization sensitivity validation for key input changes
    - Rules audit output for testing and validation
- **Structured destination dataset (20 cities)**
    - Beijing, Shanghai, Hong Kong, Guangzhou, Shenzhen, Xi'an, Hangzhou, Suzhou, Datong, Nanjing, Guilin, Yangshuo, Lijiang, Dali, Zhangjiajie, Chengdu, Chongqing, Lhasa, Harbin, Kunming
    - JSON format with complete schema fields (see Section 10.6)
    - Public domain image sources for hero images
    - Automated validation script
- **Full transport connection matrix**
    - 380 city-pair connections (20 cities, full mesh)
    - Modes: high-speed rail, flight, train, bus
    - Duration and comfort level for each route

### Out of Scope
- Booking integration (flights, hotels, activities)
- User accounts or authentication (MVP is session-based)
- Social features (reviews, community)
- In-trip support (navigation, live updates, chat)
- Detailed attraction information (opening hours, pricing, reviews)
- Multi-language support (English-only for MVP)
- Desktop-optimized experience (mobile-first, desktop-acceptable)
- **Advanced ML-based route generation** (LLM-driven itinerary structure, black-box neural ranking)
- **AI-driven itinerary modification** (AI cannot change city sequence, day allocation, or constraint logic)
- Calendar/date-based trip length selection (wheel picker only for MVP)
- Long-form content authoring (destination guides, blog posts, detailed histories)

### Future Considerations
- User accounts for plan persistence
- Email itinerary summary
- Calendar view for trip length selection (with seasonal inference)
- Partner booking integration (affiliate or API)
- Expanded content (city guides, attraction details)
- Multi-language support (Mandarin, Spanish, etc.)
- Community features (user reviews, trip reports)
- Collaborative planning features (multi-user editing)
- Advanced ML reranking (after v0 validation)
- Additional destinations beyond initial 20 cities

---

## 9. Design & User Experience

### User Flow

**Primary Journey:**

1. **Home**
   - Hero section with value proposition
   - Single CTA: "Plan my first trip to China"

2. **Onboarding (6 screens, sequential)**
   - Screen 1: First-time confirmation (gate)
   - Screen 2: Interest selection (pill buttons, max 5 from 12 options)
   - Screen 3: Trip length (wheel picker for days)
   - Screen 4: Travel pace (Slow / Balanced / Fast)
   - Screen 5: Planning effort tolerance (Low / Medium / High)
   - Screen 6: Weather & crowd flexibility
   - Progress indicator: "Question X of 6"
   - Back navigation enabled (answers preserved)

3. **Destination Recommendations**
   - One card at a time (mobile-first, polaroid-style)
   - Card content: name, 2–3 tags, one-line description
   - Hint: "Tap to learn why this fits"
   - Actions: Skip / Interested (max 5 interested)
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
     - Connection information (distance_km, duration_min, mode)

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
- **Day Tab Content:** Day header (theme + intent), itinerary item cards (category icon, image, order, name, description), connection indicators (distance, duration, mode)
- **Share Bottom Sheet:** Scope selector, format buttons, confirmation feedback

---

## 10. Technical Considerations

### Architecture
- **Frontend:** Mobile-first responsive web app (React-based or similar modern framework)
- **Backend:** API server for recommendation logic, content delivery, and session management
- **Content Management:** Structured JSON datasets for destinations and transport connections
- **Recommendation Engine:** Hybrid rules-first engine (v0) that processes user inputs and returns validated, personalized results

### Recommendation Engine v0 (Hybrid Rules-First)

The recommendation engine follows a **hybrid architecture** where rules enforce feasibility and constraints, deterministic scoring ranks candidates, and AI is strictly bounded to explanation generation.

#### Design Principles
1. **Rules-first:** Hard constraints (pacing, logistics, feasibility) are enforced by explicit rules, not learned
2. **Explainable scoring:** Preference weights are deterministic and traceable, not black-box
3. **Bounded AI:** AI generates explanation copy only; it MUST NOT modify itinerary structure
4. **Reproducible:** Identical inputs always produce identical outputs (structure + candidates)
5. **Personalized:** Key input changes produce measurably different outputs (Jaccard distance ≥0.2)

#### Pipeline Architecture

```
User Inputs (6 answers)
    ↓
[1] Candidate Generation
    - Filter destinations by interest tags
    - Filter by season/weather suitability
    - Filter by planning effort level
    - Filter by comfort/crowd tolerance
    ↓
[2] Preference Scoring & Ranking
    - Score each candidate: interest_match + pace_fit + comfort_fit + planning_effort_fit + trip_length_fit
    - Apply diversity constraints (max N per primary_cluster)
    - Rank and select top K candidates
    ↓
[3] Itinerary Builder (Rules-First Constraint Layer)
    - Enforce FR-36~FR-43 pacing constraints
    - Validate: min stay 1.5-2 days, arrival day handling, >3h travel day accounting
    - Validate: max consecutive city changes, destination count limits (ceil(trip_days / 2.5) + 1)
    - Assign destination roles (anchor, culture, nature, recovery)
    - Build day-by-day structure with connection metadata
    ↓
[4] Rules Audit
    - Output validation record: constraint_checks, structure_validation, feasibility_confirmation
    - Log any warnings or constraint near-misses
    ↓
[5] Explanation Generator (Bounded AI)
    - Input: itinerary structure + user inputs + content metadata
    - Output: "Why this fits your trip", trade-offs, pacing rationale, day themes
    - Validate: explanations reference user inputs, no contradictions with constraints
    ↓
Final Output:
    - Destination recommendations (ranked, scored)
    - Itinerary plans (validated, explained)
    - Rules audit (for testing/debugging)
```

#### Inputs
- **User inputs (6 answers):**
  - `first_time_visitor: boolean`
  - `interests: [string] (max 5 from 12 predefined options)`
  - `trip_length_days: int`
  - `pace: "Slow" | "Balanced" | "Fast"`
  - `planning_effort: "Low" | "Medium" | "High"`
  - `weather_flexibility: "Flexible" | "Somewhat flexible" | "Comfort-focused"`

### 10.5 Predefined Interest Options (Q2)

The 12 predefined interest options for onboarding Q2 are:

1. **Ancient History & Culture** - Imperial palaces, ancient architecture, archaeological sites
2. **Modern Architecture & City Life** - Skylines, urban culture, contemporary design
3. **Natural Landscapes & Hiking** - Mountains, rivers, scenic trails, outdoor exploration
4. **Food & Culinary Experiences** - Local cuisine, street food, food markets, cooking
5. **Traditional Arts & Crafts** - Calligraphy, pottery, silk, handicrafts, traditional skills
6. **Religious & Spiritual Sites** - Temples, monasteries, sacred mountains, spiritual heritage
7. **Ethnic Minorities & Local Culture** - Indigenous cultures, traditional villages, local customs
8. **Photography & Scenic Views** - Photogenic landscapes, iconic viewpoints, visual experiences
9. **Shopping & Markets** - Local markets, boutiques, tea shops, unique goods
10. **Nightlife & Entertainment** - Night markets, bars, live performances, urban nightlife
11. **Museums & Exhibitions** - Art museums, history museums, cultural exhibitions
12. **Adventure & Outdoor Activities** - Zip-lining, rock climbing, cycling, adventure sports

**Design Notes:**
- Each option is mutually exclusive (no overlap in meaning)
- Maximum 5 selections enforced to prevent scope creep
- Options map directly to destination `interest_tags` field in dataset
- Phrased for clarity to first-time visitors (not insider jargon)

### 10.6 Destination Content Schema

Each destination in the JSON dataset MUST include the following fields:

**Core Identification:**
```json
{
  "destination_id": "string (unique identifier, lowercase, no spaces)",
  "name": "string (English name)",
  "name_cn": "string (Chinese name)"
}
```

**Personalization Fields:**
```json
{
  "interest_tags": ["string"] (1-5 tags from 12 predefined interests),
  "primary_cluster": "string (urban_modern | historical_cultural | natural_scenic | rural_traditional)"
}
```

**Pacing & Logistics:**
```json
{
  "min_recommended_stay_days": "float (e.g., 1.5, 2.0, 3.0)",
  "transport_hub_tier": "string (major | regional | remote)"
}
```

**Comfort & Season Filtering:**
```json
{
  "best_seasons": ["string"] (spring | summer | fall | winter),
  "weather_risk_level": "string (low | moderate | high)",
  "crowd_level": "string (low | moderate | high | very_high)"
}
```

**Role & Intent:**
```json
{
  "role_options": ["string"] (anchor | culture | nature | recovery | contrast)
}
```

**Explanation Context:**
```json
{
  "base_description": "string (1-2 sentences, neutral tone)"
}
```

**Planning Complexity:**
```json
{
  "planning_effort_level": "string (Low | Medium | High)"
}
```

**Visual:**
```json
{
  "image_url": "string (public domain or licensed image URL)"
}
```

**Complete Example:**
```json
{
  "destination_id": "beijing",
  "name": "Beijing",
  "name_cn": "北京",
  "interest_tags": [
    "Ancient History & Culture",
    "Museums & Exhibitions",
    "Modern Architecture & City Life",
    "Food & Culinary Experiences"
  ],
  "primary_cluster": "historical_cultural",
  "min_recommended_stay_days": 3.0,
  "transport_hub_tier": "major",
  "best_seasons": ["spring", "fall"],
  "weather_risk_level": "moderate",
  "crowd_level": "very_high",
  "role_options": ["anchor", "culture"],
  "base_description": "China's capital blending 3,000 years of imperial heritage with modern dynamism, home to the Forbidden City, Great Wall, and cutting-edge architecture.",
  "planning_effort_level": "Low",
  "image_url": "https://example.com/images/beijing.jpg"
}
```

### 10.7 Transport Connection Schema

**Inter-city Transport Metadata:**
```json
{
  "origin_id": "string (destination_id)",
  "destination_id": "string (destination_id)",
  "mode": "string (high_speed_rail | flight | train | bus)",
  "duration_hours": "float (total travel time including transfers)",
  "comfort_level": "string (high | moderate | low)"
}
```

**Complete Example:**
```json
{
  "origin_id": "beijing",
  "destination_id": "xian",
  "mode": "high_speed_rail",
  "duration_hours": 4.5,
  "comfort_level": "high"
}
```

**Coverage Requirements:**
- Full mesh: All 20 cities × 19 other cities = 380 unidirectional connections
- Bidirectional routes stored as separate entries (beijing→xian and xian→beijing)
- Primary mode selection based on: speed, comfort, and popularity among travelers

#### Scoring Weights (Deterministic)
Each candidate destination receives a total score:
```
score = w1 * interest_match_score
      + w2 * pace_fit_score
      + w3 * comfort_fit_score
      + w4 * planning_effort_fit_score
      + w5 * trip_length_fit_score
```
Where:
- `interest_match_score`: ratio of overlapping interest tags (0.0–1.0)
- `pace_fit_score`: compatibility between user pace and destination recommended duration
- `comfort_fit_score`: match between user weather_flexibility and destination crowd_level + weather_risk_level
- `planning_effort_fit_score`: match between user planning tolerance and destination complexity
- `trip_length_fit_score`: penalty if destination min_recommended_stay > user available time

Weight values (w1–w5) are defined during implementation and validated through beta testing.

Diversity constraint: Max 40% of top 10 recommendations from any single `primary_cluster`.

#### Itinerary Builder Constraints (Rules Layer)
The itinerary builder MUST enforce all pacing constraints (FR-36 through FR-43):
1. Allocate ≥1.5–2 full days per destination
2. Treat arrival day as partial or non-exploration day
3. Account for inter-city travel >3 hours as travel day
4. Limit consecutive city changes to max 1 per trip
5. Constrain destination count by trip duration using formula: `max_destinations = ceil(trip_days / 2.5) + 1`
   - 7 days = 3 destinations
   - 14 days = 6 destinations
   - 21 days = 9 destinations
6. Assign each destination a role in journey
7. If constraints conflict, reduce destination count (not stay duration)

Validation logic runs after itinerary generation and outputs a `rules_audit` record.

#### Rules Audit Output Schema

Each generated itinerary includes a `rules_audit` JSON record with the following fields:

```json
{
  "itinerary_id": "string (unique identifier)",
  "generated_at": "ISO8601 timestamp",
  "user_inputs_hash": "string (for reproducibility testing)",
  "constraint_checks": {
    "min_stay_per_destination": {
      "passed": "boolean",
      "details": "array of {destination_id, stay_days, min_required, status}"
    },
    "arrival_day_handling": {
      "passed": "boolean",
      "arrival_day_type": "partial | non_exploration"
    },
    "travel_day_accounting": {
      "passed": "boolean",
      "details": "array of {leg, duration_hours, accounted_as}"
    },
    "consecutive_city_changes": {
      "passed": "boolean",
      "count": "int",
      "max_allowed": 1
    },
    "destination_count_limit": {
      "passed": "boolean",
      "count": "int",
      "max_for_trip_length": "int (using formula: ceil(trip_days / 2.5) + 1)"
    },
    "destination_roles_assigned": {
      "passed": "boolean",
      "roles": "array of {destination_id, assigned_role}"
    }
  },
  "structure_validation": {
    "route_feasibility": "boolean",
    "day_allocation_complete": "boolean",
    "transport_connections_valid": "boolean"
  },
  "warnings": "array of strings (non-fatal issues)",
  "overall_status": "pass | fail"
}
```

This audit is used for:
- Automated testing (constraint compliance)
- Debugging during development
- QA validation
- Performance monitoring (not exposed to end users in MVP)

#### AI Role and Boundaries

**AI is used ONLY for:**
- Generating "Why this fits your trip" explanation copy
- Generating trade-off explanations
- Generating pacing rationale text
- Generating day-level themes and intents
- (Optional) Reranking already-valid itineraries for stylistic variety

**AI MUST NOT:**
- Generate or modify itinerary structure (city sequence, day allocation)
- Override or bypass constraint rules (FR-36~FR-43)
- Generate explanations that contradict itinerary properties or user inputs
- Make routing or scheduling decisions

**AI Input Context:**
- User inputs (interests, pace, time, etc.)
- Itinerary structure (cities, stay lengths, roles, transport)
- Destination metadata (tags, descriptions, seasonal info, crowd levels, weather risks)

**AI Output Validation:**
- Explanations MUST reference specific user inputs
- Explanations MUST NOT contradict constraint checks (e.g., cannot claim "relaxed pace" if consecutive city changes)
- Explanations MUST avoid generic marketing language

#### Outputs
- **Destination recommendations:** Ranked list with scores and tags
- **Itinerary plans:** Validated structures with day-by-day breakdown including connection metadata (distance_km, duration_min, mode)
- **Explanations:** AI-generated user-facing copy (validated for consistency)
- **Rules audit:** Internal validation record for each itinerary (JSON schema defined above)

#### Testing & Validation
- Unit tests for scoring functions (deterministic outputs)
- Integration tests for constraint validation (FR-36~FR-43 compliance)
- Reproducibility tests (identical inputs → identical structure)
- Personalization sensitivity tests (key input changes → Jaccard distance ≥0.2)
- Explanation traceability tests (AI output references inputs)
- Sensitivity tests (weight tuning does not break constraints or diversity)
- Dataset validation tests (all destinations pass schema requirements)

### Technology Stack
- **Frontend:** Modern JavaScript framework (React/Next.js or equivalent)
- **Backend:** REST or GraphQL API (language/framework TBD based on team expertise)
- **Database:** Relational or document store for structured content (vendor TBD)
- **Content Storage:** JSON files for destinations and transport connections (static data for MVP)
- **AI/LLM Integration:** API-based LLM service for explanation generation with validation layer
- **Hosting:** Cloud platform (vendor TBD based on deployment requirements)
- **Image Sources:** Public domain or Creative Commons licensed images (Unsplash, Wikimedia Commons)

### Dependencies
- Destination content dataset (JSON, 20 cities with complete schema)
- Transport connection matrix (JSON, 380 city pairs)
- Dataset validation script (automated schema compliance checking)
- Recommendation engine implementation (rules + scoring + AI validation)
- LLM API integration with retry logic
- Image hosting and CDN
- Analytics integration
- Share link generation and storage
- Image rendering for "Save as image" feature

### Integration Points
- None for MVP (booking, maps, weather APIs are out of scope)
- Future: Booking APIs, mapping services, weather data

---

## 11. Risks & Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
|------|--------|-------------|---------------------|
| Recommendation logic produces overly similar results for different users | High | Medium | Implement personalization sensitivity validation (Jaccard distance ≥0.2 on key input changes); monitor recommendation diversity in beta testing; tune scoring weights to balance relevance and variety |
| Onboarding drop-off rate exceeds 50% | High | Medium | A/B test question order and phrasing; minimize friction; show progress clearly; allow back navigation |
| Users distrust recommendations due to lack of transparency | High | Low | Ensure "Why this fits your trip" explicitly references user inputs; surface constraints in "Good to know"; avoid black-box AI |
| Content quality is inconsistent or inaccurate | Medium | Medium | Implement content review process; source from trusted references; establish tone and style guide; validate metadata completeness (primary_cluster, crowd_level, etc.) via automated script |
| Mobile performance issues (slow load, laggy interactions) | Medium | Low | Optimize images; implement lazy loading; use performance monitoring tools |
| Users expect booking functionality (out of scope for MVP) | Medium | High | Clearly communicate product purpose on home screen; set expectations early; plan future booking integration |
| Insufficient destination or itinerary variety | Medium | Medium | Start with curated set (20 destinations, 8–12 itineraries); ensure diversity across primary_clusters; expand based on user demand patterns |
| Day-level content generation requires significant manual effort | Medium | Medium | Create reusable content templates; establish clear authoring guidelines; consider content generation assistance tools |
| Shared itineraries create unmanageable storage or performance burden | Low | Low | Implement share link expiration policy; use efficient storage format; monitor usage patterns |
| Pacing constraints reduce itinerary variety below user expectations | Medium | Medium | Communicate value of realistic pacing in explanations; educate users on travel fatigue risks; ensure remaining variety is high-quality |
| Users with many interested destinations receive fewer-than-expected itinerary options due to pacing constraints | Medium | High | Clearly explain in "Good to know" why fewer destinations = better experience; surface trade-offs transparently; enforce max 5 "Interested" selections to set expectations early |
| AI-generated explanations contain hallucinations or contradict itinerary constraints | High | Medium | Implement validation layer that checks AI output against itinerary structure and user inputs; use structured prompts with explicit constraint context; flag and regenerate invalid explanations; include fallback to template-based explanations |
| Scoring weights produce unbalanced recommendations (e.g., always prioritize same destination types) | Medium | Medium | Implement diversity constraints (max 40% per primary_cluster); conduct sensitivity analysis on weight values; monitor recommendation distribution in beta testing; adjust weights based on user engagement patterns |
| LLM API failures or rate limiting disrupt explanation generation | Medium | Low | Implement retry logic with exponential backoff; cache generated explanations for common input patterns; provide template-based fallback explanations when API unavailable; monitor API usage and costs |
| Dataset authoring takes longer than expected, delaying MVP launch | Medium | High | Start with 10-12 core destinations and expand to 20 in phases; prioritize major cities first; use structured templates to speed authoring; consider parallel authoring across team members |
| Transport connection data has errors or missing routes | Medium | Medium | Cross-reference multiple sources (official rail sites, flight schedules); validate duration estimates with actual traveler data; flag missing connections during testing; implement fallback routing logic |
| Public image sources lack quality or appropriate licensing | Low | Medium | Pre-screen image sources for licensing clarity; maintain image attribution file; budget for stock photos if needed; establish image quality standards (resolution, composition) |

---

## 12. Launch Plan

### Rollout Strategy
- **Phase 1: Internal Testing (Week 1–2)**
  - Team dogfooding and QA
  - Validate recommendation logic with test inputs
  - Validate personalization sensitivity (Jaccard distance ≥0.2 on key input changes)
  - Test sharing functionality across formats
  - Validate pacing constraint enforcement across all itineraries
  - Test rules audit output for completeness and accuracy
  - Validate AI explanation quality and consistency
  - Run dataset validation script to ensure all 20 destinations pass schema requirements
  - Test transport connection matrix for missing routes or errors

- **Phase 2: Closed Beta (Week 3–4)**
  - Invite 50–100 target users (first-time China travelers)
  - Collect qualitative feedback on onboarding, recommendations, and explainability
  - Track completion rates and engagement metrics
  - Test share feature adoption and formats used
  - Gather feedback on itinerary pacing and realism
  - Monitor explanation quality and user trust indicators
  - Validate diversity of recommendations across user cohorts
  - Track "Interested" destination selection patterns (validate max 5 enforcement)

- **Phase 3: Public Launch (Week 5+)**
  - Soft launch via social media, travel communities, SEO
  - Monitor performance, drop-off rates, and user feedback
  - Iterate on content and UX based on data
  - Monitor AI explanation quality at scale
  - Tune scoring weights based on engagement patterns
  - Track personalization sensitivity metrics
  - Expand destination count if demand exceeds 20-city coverage

### Testing Plan
- **Unit testing:** Frontend components, backend API endpoints, scoring functions (deterministic outputs)
- **Integration testing:** End-to-end user flows (onboarding → recommendations → plan selection → sharing)
- **User acceptance testing:** Beta testers validate that recommendations are personalized and explainable
- **Performance testing:** Load time, mobile responsiveness, API response time
- **Personalization validation:** Automated tests for key input changes (interests, pace, trip length) producing Jaccard distance ≥0.2 in top 10 recommendations
- **Reproducibility testing:** Identical user inputs produce identical destination sets and itinerary structures across multiple runs
- **Share functionality testing:** Verify all share formats render correctly; test read-only access
- **Pacing constraint validation:** Automated tests ensure all generated itineraries meet minimum stay duration, travel day accounting, and city change limits using formula: max_destinations = ceil(trip_days / 2.5) + 1
- **Rules audit validation:** Verify rules_audit output includes all constraint checks and validation results; test audit completeness for edge cases
- **Explanation traceability testing:** Validate AI-generated explanations reference specific user inputs and itinerary properties; flag generic or contradictory content
- **Diversity testing:** Verify top 10 recommendations respect primary_cluster distribution limits (max 40% per cluster)
- **Sensitivity testing:** Adjust scoring weights within reasonable ranges and verify recommendations remain diverse and constraint-compliant
- **AI output validation testing:** Test explanation validation layer catches contradictions and hallucinations; verify fallback to template-based explanations when AI fails
- **Dataset validation testing:** Run automated script to verify all 20 destinations include required schema fields with valid enum values
- **Transport connection testing:** Verify all 380 city pairs have connection data; validate duration estimates are realistic; test routing logic with missing connections
- **Max interested limit testing:** Verify users cannot select more than 5 "Interested" destinations; test UI enforcement and error messaging

### Marketing/Communication Plan
- **Positioning:** "Stop browsing. Start deciding. A smarter way to plan your first trip to China."
- **Channels:** Travel subreddits, Facebook groups (China travel), SEO (first-time China travel keywords), travel blogs/partnerships
- **Messaging:** Emphasize decision support, personalization, and explainability (not generic AI or listicles)

---

## 13. Open Questions

- [ ] What are the exact scoring weight values (w1–w5) for interest match, pace fit, comfort fit, planning effort, and trip length?
- [ ] What is the acceptable threshold for AI explanation regeneration (e.g., retry up to N times if validation fails)?
- [ ] Should dataset start with 10-12 core cities and expand to 20 in phases, or launch with full 20-city coverage?
- [ ] What is the fallback behavior if no transport connection exists between two "Interested" destinations?
- [ ] Should shared itinerary links expire after N days/months, or persist indefinitely?
- [ ] What is the user experience when all "Interested" destinations cannot fit within pacing constraints? (Show reduced itinerary? Ask to deselect destinations?)

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
- **Section 12 (Testing Plan):** Added pacing constraint validation testing requirement
- **Section 13 (Open Questions):** Added two new questions about destination count formulas and edge case handling

### Why This Change Was Necessary
Without enforceable pacing constraints, the recommendation system could generate itineraries that cause user frustration, travel fatigue, and low confidence in the product. These constraints ensure:
- Users receive realistic, actionable plans
- First-timer mistakes (rushed pacing, logistical complexity) are systematically avoided
- Product trust and commitment rates improve
- Future features remain consistent with realistic travel planning principles

---

## Summary of Changes (v1.2 Update)

### What Changed
This update resolves the open question "What is the exact recommendation logic?" by defining a **hybrid rules-first recommendation engine** for the MVP. The decision establishes clear boundaries between rules-based constraint enforcement, deterministic preference scoring, and bounded AI usage for explanation generation only.

Additionally, this update includes **refinements to personalization validation, content schema, and interaction design** to ensure the PRD is implementation-ready and testable.

### Major Changes

**1. Recommendation Logic Architecture Defined:**
- **Hybrid (rules-first)** approach with 5-stage pipeline
- Rules enforce pacing constraints (FR-36~FR-43)
- Deterministic scoring for candidate ranking
- AI bounded to explanation generation only
- Reproducibility guaranteed for identical inputs
- Rules audit output for testing and validation

**2. Personalization Metric Refined:**
- Replaced unmeasurable "100% customization accuracy" with **Personalization Sensitivity** metric
- New metric: When users change ≥2 key inputs (interests, pace, trip length), top 10 recommendations must differ by ≥20% (Jaccard similarity <0.8)
- Maintains reproducibility requirement: identical inputs produce identical outputs
- Updated FR-21, FR-22, Success Metrics, and related user story criteria

**3. Destination Content Schema Expanded:**
- Added `primary_cluster` field (allowed values: `urban_modern`, `historical_cultural`, `natural_scenic`, `rural_traditional`) for diversity constraints
- Added `crowd_level` field (allowed values: `low`, `moderate`, `high`, `very_high`) for comfort_fit scoring
- Added `weather_risk_level` field (allowed values: `low`, `moderate`, `high`) for season filtering
- Defined allowed values for all enum-like fields

**4. Connection Metadata Requirements Clarified:**
- Updated FR-30 to require `distance_km`, `duration_min`, and `mode` fields
- Aligned User Story 5 acceptance criteria to match FR-30
- Added allowed values for `mode` field in transport metadata

**5. Onboarding Interaction Locked for MVP:**
- FR-05 updated: Q3 uses wheel picker only for MVP
- Calendar/date selection moved to Future Considerations (Out of Scope for MVP)
- Clarified in Scope section

**6. Rules Audit Schema Defined:**
- Added complete JSON schema for `rules_audit` output
- Includes: constraint_checks, structure_validation, warnings, overall_status
- Enables automated testing, debugging, and QA validation

**7. Open Questions Cleaned:**
- Removed resolved questions (recommendation logic, calendar input)
- Consolidated duplicate questions
- Kept only truly TBD items (scoring weights, destination count formulas, edge cases)

**8. Tech Stack Simplified:**
- Reduced vendor-specific noise in Technology Stack section
- Kept high-level system requirements
- Moved specific vendor selection to implementation phase (marked as TBD)

### Sections Updated

**Section 4 (Success Metrics):**
- Replaced "Customization accuracy = 100%" with "Personalization sensitivity >0.2 Jaccard distance on key input changes"

**Section 6 (User Stories):**
- User Story 2: Updated acceptance criteria to reflect measurable personalization threshold
- User Story 4: Updated acceptance criteria to reflect measurable personalization threshold
- User Story 5: Added `distance_km`, `duration_min`, and `mode` to connection metadata acceptance criteria

**Section 7.1 (Functional Requirements):**
- FR-05: Updated to lock wheel picker for MVP, defer calendar to future
- FR-21: Replaced with measurable personalization sensitivity requirement
- FR-22: Updated to focus on reproducibility for identical inputs
- FR-30: Updated to require distance_km, duration_min, mode fields
- Added FR-44: Rules audit output requirement
- Added FR-45: Explanation traceability requirement
- Added FR-46: AI explanation validation requirement
- Added FR-47: Deterministic scoring requirement

**Section 8 (Scope):**
- In Scope: Added wheel picker clarification, personalization sensitivity validation
- Out of Scope: Added calendar/date selection for trip length
- Future Considerations: Added calendar view for trip length

**Section 9 (User Flow):**
- Step 2: Clarified wheel picker for trip length
- Step 6: Added connection metadata (distance_km, duration_min, mode) to day tab content

**Section 10 (Technical Considerations):**
- Added comprehensive "Recommendation Engine v0 (Hybrid Rules-First)" subsection with:
  - Pipeline architecture (5 stages)
  - Inputs (6 user answers)
  - Expanded content schema (primary_cluster, crowd_level, weather_risk_level with allowed values)
  - Scoring weights (deterministic)
  - AI role and boundaries
  - **Rules audit output schema (complete JSON structure)**
  - Outputs (destinations, itineraries, explanations, audit)
- Simplified Technology Stack section (removed vendor-specific details)

**Section 11 (Risks & Mitigation):**
- Updated first risk to reflect personalization sensitivity validation
- Added AI hallucination risk
- Added scoring weight imbalance risk
- Added LLM API failure risk

**Section 12 (Testing Plan):**
- Added personalization sensitivity testing (Jaccard distance ≥0.2)
- Added reproducibility testing
- Added rules audit validation testing
- Added explanation traceability testing
- Added diversity testing (primary_cluster distribution)
- Added sensitivity testing for scoring weights
- Added AI output validation testing

**Section 13 (Open Questions):**
- Removed: "What is the exact recommendation logic?" (resolved)
- Removed: "Should calendar input capture exact dates or just month/season?" (resolved: wheel picker for MVP)
- Removed: "Should rules_audit be exposed to users?" (resolved: internal only for MVP)
- Removed: "How should day-level narrative content be authored at scale?" (implementation detail)
- Kept: Scoring weight values, destination count formulas, edge case handling

### Why These Changes Were Necessary

**Original v1.2 Issues Addressed:**
1. **Unmeasurable personalization metric:** "100% no identical outputs for different inputs" was unrealistic and untestable (minor input changes shouldn't force 100% different outputs)
2. **Incomplete content schema:** Missing fields needed for comfort_fit scoring, diversity constraints, and season filtering
3. **Inconsistent connection metadata:** User Story 5 and FR-30 had misaligned requirements
4. **Ambiguous onboarding interaction:** Both wheel picker and calendar were mentioned without clarity on MVP scope
5. **Missing rules_audit schema:** Implementation couldn't proceed without structured audit output definition
6. **Noisy open questions:** Contained already-resolved items and implementation details
7. **Vendor-specific tech stack details:** Distracted from core architectural requirements

**Impact of Fixes:**
- **Testable personalization:** Engineering can now validate recommendation diversity with clear threshold (Jaccard distance ≥0.2)
- **Complete content schema:** Content team has all required fields and allowed values for data authoring
- **Implementation-ready audit:** QA and engineering can build/test rules validation with defined JSON schema
- **Clear MVP scope:** No ambiguity about wheel picker vs calendar for trip length
- **Focused open questions:** Only truly TBD items remain (scoring weights, edge cases)
- **Cleaner technical specification:** High-level architecture without premature vendor lock-in

The v1.2 PRD is now **fully implementation-ready** with no blocking ambiguities, measurable acceptance criteria, and complete technical specifications.

---

## Summary of Changes (v1.3 Update)

### What Changed
This update shifts from conceptual content schema to **concrete implementation specifications** for the MVP dataset. The key decision is to treat destination content as **structured JSON data** rather than long-form writing, enabling faster MVP delivery and better testability.

Additionally, this update defines the **12 predefined interest options** for onboarding Q2, provides a **complete destination content schema with examples**, establishes **transport connection data requirements**, and adds **dataset validation** as a first-class requirement.

### Major Changes

**1. Structured Dataset Approach:**
- Destination content stored as JSON files (not CMS or database for MVP)
- 20 initial cities explicitly listed: Beijing, Shanghai, Hong Kong, Guangzhou, Shenzhen, Xi'an, Hangzhou, Suzhou, Datong, Nanjing, Guilin, Yangshuo, Lijiang, Dali, Zhangjiajie, Chengdu, Chongqing, Lhasa, Harbin, Kunming
- Full transport connection matrix: 380 city pairs (20 × 19 bidirectional)
- Public domain image sources specified (Unsplash, Wikimedia Commons)
- Automated dataset validation script as requirement

**2. 12 Interest Options Defined (Section 10.5 - NEW):**
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

Each option is mutually exclusive, maps to destination `interest_tags`, and is phrased for first-time visitor clarity.

**3. Destination Content Schema Enhanced (Section 10.6):**
- Added `name_cn` field for Chinese names
- Complete JSON example provided for Beijing
- All enum values explicitly documented
- Image URL field specified with public domain requirement

**4. Transport Connection Schema Formalized (Section 10.7 - NEW):**
- Complete schema with example
- Coverage requirements: 380 unidirectional connections
- Bidirectional routes stored separately
- Mode selection guidance (speed, comfort, popularity)

**5. Destination Count Formula Clarified:**
- FR-40 updated with explicit formula: `max_destinations = ceil(trip_days / 2.5) + 1`
- Examples provided: 7d=3, 14d=6, 21d=9
- Applied to constraint validation and rules audit schema

**6. Max "Interested" Limit Added:**
- FR-48 (NEW): Enforce maximum 5 "Interested" destination selections
- Prevents scope creep and sets user expectations early
- Aligns with itinerary generation constraints

**7. Dataset Validation Requirements:**
- FR-49 (NEW): Structured JSON dataset requirement
- FR-50 (NEW): Full mesh transport coverage requirement
- NFR-08 (NEW): Dataset validation script requirement
- Added dataset validation testing to test plan

### Sections Updated

**Section 7.1 (Functional Requirements):**
- FR-04: Updated to specify "max 5 selections from 12 predefined options"
- FR-40: Updated with explicit destination count formula
- FR-48 (NEW): Max 5 "Interested" destinations limit
- FR-49 (NEW): Structured JSON dataset requirement
- FR-50 (NEW): Full transport connection matrix requirement

**Section 7.2 (Non-Functional Requirements):**
- NFR-08 (NEW): Dataset validation script requirement

**Section 8 (Scope):**
- In Scope: Added structured destination dataset (20 cities, explicit list)
- In Scope: Added full transport connection matrix (380 pairs)
- In Scope: Added automated validation script
- In Scope: Added max 5 "Interested" selections enforcement
- In Scope: Added public domain image sources
- Out of Scope: Added long-form content authoring
- Future Considerations: Added "Additional destinations beyond initial 20 cities"

**Section 9 (User Flow):**
- Step 2: Updated to "max 5 from 12 options"
- Step 3: Updated to note "max 5 interested" enforcement

**Section 10.5 (NEW):**
- Complete list of 12 predefined interest options
- Design notes and mapping guidance

**Section 10.6 (Destination Content Schema):**
- Added `name_cn` field
- Complete JSON example for Beijing
- All enum values documented

**Section 10.7 (NEW - Transport Connection Schema):**
- Complete schema definition
- Coverage requirements (380 connections)
- Example for Beijing → Xi'an route

**Section 10 (Technology Stack):**
- Content Storage: JSON files for MVP (not CMS/database)
- Image Sources: Public domain or Creative Commons (Unsplash, Wikimedia Commons)

**Section 10 (Dependencies):**
- Added destination content dataset (JSON, 20 cities)
- Added transport connection matrix (JSON, 380 pairs)
- Added dataset validation script

**Section 11 (Risks & Mitigation):**
- Updated "Content quality is inconsistent" to include automated validation script
- Added "Users with many interested destinations receive fewer options" to note max 5 enforcement
- Added "Dataset authoring takes longer than expected" as new risk
- Added "Transport connection data has errors" as new risk
- Added "Public image sources lack quality or licensing" as new risk

**Section 12 (Testing Plan):**
- Added dataset validation testing
- Added transport connection testing
- Added max interested limit testing

**Section 13 (Open Questions):**
- Removed: "What is the exact destination count formula for trips longer than 7 days?" (resolved: formula defined)
- Removed: "Should 'Interested' destinations be limited?" (resolved: max 5 enforced)
- Added: "Should dataset start with 10-12 core cities and expand to 20 in phases?"
- Added: "What is the fallback behavior if no transport connection exists between two 'Interested' destinations?"

### Why These Changes Were Necessary

**Shifts from v1.2:**
1. **Content authoring ambiguity:** v1.2 described content schema but didn't specify format, storage, or scope
2. **Missing interest options:** 12 interest options were mentioned but never defined
3. **Incomplete transport requirements:** Connection schema existed but coverage wasn't quantified
4. **No validation strategy:** Data quality relied on manual review, no automated gates
5. **Unclear destination count formula:** Formula mentioned but not specified

**Impact of v1.3 Changes:**
- **Clear dataset scope:** Engineering knows exactly what to build (20 cities, 380 connections)
- **Actionable content schema:** Content team can begin authoring immediately with complete examples
- **Testable data quality:** Validation script ensures all destinations meet requirements before deployment
- **Defined interest options:** Design and engineering can build Q2 with finalized option list
- **Transport coverage guarantee:** Full mesh ensures any destination combination can be routed
- **User expectation management:** Max 5 "Interested" limit prevents unrealistic itinerary expectations

The v1.3 PRD is now **ready for dataset creation and implementation** with concrete specifications, no content ambiguity, and automated quality gates.
