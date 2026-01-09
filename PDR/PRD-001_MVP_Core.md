# Product Requirements Document (PRD)

## 1. Product Information

**Product Name:** China Travel Decision Support App (MVP Core)
**Version:** PRD-001
**Date:** 2026-01-06
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
| Plan save/export rate | >25% | Users who save or share a plan (future feature) |
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
- Has fixed or semi-fixed time window (5–21 days typical)
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
**I want to** choose from suggested itineraries that match my inputs
**So that** I can see how destinations connect into a realistic journey

**Acceptance Criteria:**
- [ ] Multiple itinerary cards are displayed (concept-level overview)
- [ ] Each card shows: journey title, route (City → City → City), experience coverage pills, total days, pace
- [ ] User can tap a plan to view detailed explanation
- [ ] Plans are customized based on user inputs and interested destinations
- [ ] Different user inputs produce different plan recommendations

### User Story 5: Itinerary Plan Detail
**As a** user evaluating an itinerary
**I want to** understand the logic behind the route, pacing, and trade-offs
**So that** I can commit to a plan with confidence

**Acceptance Criteria:**
- [ ] Detail view includes: Overview, Route breakdown (city-by-city with stay length and role), Travel flow, Good to know, Who this plan is best for
- [ ] Each city's role in the journey is explained (adaptation, contrast, nature, pacing, etc.)
- [ ] Trade-offs are surfaced (e.g., "Fast pace means less downtime")
- [ ] Explanation connects to user inputs (interests, pace, time)

---

## 7. Requirements

### 7.1 Functional Requirements

| ID | Requirement | Priority | Notes |
|----|-------------|----------|-------|
| FR-01 | Home screen displays single primary CTA: "Plan my first trip to China" | High | Single-purpose entry point |
| FR-02 | Onboarding flow presents 6 questions, one per screen | High | Mobile-first, sequential |
| FR-03 | Q1: First-time confirmation gate (Yes/No) | High | Users who select "No" are excluded from flow |
| FR-04 | Q2: Interest selection (pill buttons, max 5 selections) | High | 12 predefined interest options |
| FR-05 | Q3: Trip length selection (wheel picker for days OR calendar view for dates) | High | Calendar infers length + season |
| FR-06 | Q4: Travel pace selection (Slow / Balanced / Fast) | High | Single-choice selector |
| FR-07 | Q5: Planning effort tolerance (Low / Medium / High) | High | Single-choice selector |
| FR-08 | Q6: Weather & crowd flexibility (Flexible / Somewhat flexible / Comfort-focused) | High | Single-choice selector |
| FR-09 | Destination recommendations display ONE card at a time | High | Mobile-first, polaroid-style |
| FR-10 | Destination card shows: name, 2–3 tags, one-line description, hint ("Tap to learn why this fits") | High | Minimal cognitive load |
| FR-11 | Destination card actions: Skip / Interested | High | Binary choice, no neutral option |
| FR-12 | Tapping card opens destination detail sheet | High | Mobile sheet, not full-page nav |
| FR-13 | Destination detail includes 4 content blocks: "Why people like this," "Best time to visit," "Why this fits your trip," "Good to know" | High | Structured decision support |
| FR-14 | "Why this fits your trip" explicitly references user inputs | High | Critical for trust and explainability |
| FR-15 | "Good to know" surfaces 2–3 realistic constraints in neutral tone | High | No alarmism, no sugar-coating |
| FR-16 | Destination detail has sticky bottom actions: Back / Add to my trip | High | Persistent decision actions |
| FR-17 | Itinerary plan cards display: journey title, route overview, experience pills, days, pace | High | Concept-level overview |
| FR-18 | Tapping plan card opens detailed explanation view | High | Two-level structure |
| FR-19 | Plan detail includes: Overview, Route breakdown, Travel flow, Good to know, Who this plan is best for | High | Structured explanation |
| FR-20 | Route breakdown shows each city with stay length and role explanation | High | Explainable journey structure |
| FR-21 | Recommendations are customized: different inputs must produce different results | High | Core product principle |
| FR-22 | No user with different inputs receives identical destination or itinerary sets | High | Non-negotiable customization requirement |
| FR-23 | User can navigate back to edit previous onboarding answers | Medium | Allows refinement |
| FR-24 | Progress indicator shows onboarding completion (e.g., "3 of 6") | Medium | Reduces drop-off |
| FR-25 | Hero images in destination detail are reduced size (25–30% screen height) | Medium | Content over visuals |

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
- Mobile-first web application (responsive design)
- 6-question onboarding flow
- Customized destination recommendations (one-at-a-time card UI)
- Destination detail sheets with decision-support content
- Suggested itinerary plans (two-level structure: concept + detail)
- Explainable recommendation logic (WHY this fits)
- Constraint and trade-off surfacing (Good to know sections)
- Basic user input persistence (session-based)

### Out of Scope
- Booking integration (flights, hotels, activities)
- User accounts or authentication (MVP is session-based)
- Social features (sharing, reviews, community)
- In-trip support (navigation, live updates, chat)
- Detailed attraction information (opening hours, pricing, reviews)
- Multi-language support (English-only for MVP)
- Desktop-optimized experience (mobile-first, desktop-acceptable)
- Decision engine specification (logic defined in future PRD)
- AI role definition and responsibility boundaries (defined in future PRD)

### Future Considerations
- Save/export itinerary functionality
- User accounts for plan persistence
- Email itinerary summary
- Partner booking integration (affiliate or API)
- Expanded content (city guides, attraction details)
- Multi-language support (Mandarin, Spanish, etc.)
- Community features (user reviews, trip reports)

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
   - Tap to view plan detail

6. **Itinerary Plan Detail**
   - Overview (what kind of journey)
   - Route breakdown (city-by-city with stay length and role)
   - Travel flow (why transfers are reasonable)
   - Good to know (constraints/trade-offs)
   - Who this plan is best for

### Wireframes/Mockups
To be developed by Design team based on this PRD.

### Key UI Components
- **Onboarding Question Screen:** Title, subtitle, input control (pills/wheel/buttons), progress bar, Next/Back buttons
- **Destination Card:** Large card UI, hero image, title, tags, description, hint, Skip/Interested buttons
- **Destination Detail Sheet:** Modal/sheet overlay, hero image, content blocks (cards), sticky bottom actions
- **Itinerary Card:** Title, route visualization, pill tags, metadata (days, pace)
- **Itinerary Detail Screen:** Scrollable content, section headers, city breakdown table/list

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
| Users abandon after viewing recommendations without taking action | Medium | High | Future: Add save/export functionality; for MVP, measure engagement and plan detail views as success metrics |

---

## 13. Launch Plan

### Rollout Strategy
- **Phase 1: Internal Testing (Week 1–2)**
  - Team dogfooding and QA
  - Validate recommendation logic with test inputs
  - Ensure customization requirement is met

- **Phase 2: Closed Beta (Week 3–4)**
  - Invite 50–100 target users (first-time China travelers)
  - Collect qualitative feedback on onboarding, recommendations, and explainability
  - Track completion rates and engagement metrics

- **Phase 3: Public Launch (Week 5+)**
  - Soft launch via social media, travel communities, SEO
  - Monitor performance, drop-off rates, and user feedback
  - Iterate on content and UX based on data

### Testing Plan
- **Unit testing:** Frontend components, backend API endpoints
- **Integration testing:** End-to-end user flows (onboarding → recommendations → plan selection)
- **User acceptance testing:** Beta testers validate that recommendations are customized and explainable
- **Performance testing:** Load time, mobile responsiveness, API response time
- **Customization validation:** Automated tests ensure different inputs produce different outputs

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

---

## Approval Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Manager | | | |
| Engineering Lead | | | |
| Design Lead | | | |
| Stakeholder | | | |
