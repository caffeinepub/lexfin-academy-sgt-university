# LexFin Academy - SGT University

## Current State
The site has: Navbar, Hero, About, Objectives (tabs), Timeline, Team, Registration, and Footer sections. Navigation links point to: about, objectives, timeline, team, register.

## Requested Changes (Diff)

### Add
- New `ThreeLayerRoadmap` section between the About and Objectives sections
- Three visually distinct layer cards:
  - Layer I: Text-Based Knowledge (Simplification) — reading/text icon, describes NLP-simplified regulatory text
  - Layer II: Audio-Visual Modules (Enhancement) — video/media icon, describes multimedia learning
  - Layer III: Gamification (Validation) — game/trophy icon, describes quizzes, challenges, and scoring
- Animated reveal for each layer (staggered)
- A connecting visual (vertical or horizontal flow) showing the layers build on each other
- "roadmap" nav link added to navbar

### Modify
- Navbar links: add `{ id: "roadmap", label: "Roadmap" }` between About and Objectives
- Main page render order: insert `<ThreeLayerRoadmapSection />` between `<AboutSection />` and `<ObjectivesSection />`

### Remove
- Nothing removed

## Implementation Plan
1. Create `ThreeLayerRoadmapSection` component in LexFinPage.tsx
2. Design 3 layered cards with icons, titles, subtitles, and descriptions for each layer
3. Add animated staggered entry with connecting arrows/lines between layers
4. Add `roadmap` id anchor to the section
5. Insert the section in main render between About and Objectives
6. Add roadmap nav link to Navbar
