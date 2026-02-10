# Kibo Design System

## Core Philosophy

**Engineering Hope. Building Legacy.**
The design should reflect stability, growth, and clarity. Kibo designs are minimalist, functional, and visually striking without relying on gradients or glows.

## Aesthetics

- **Minimalist**: Avoid unnecessary decorations.
- **Solid Colors**: NO GRADIENTS.
- **Clean Edges**: NO BLURS OR GLOWS.
- **High Contrast**: Ensure readability.

## Color Hierarchy (STRICT)

**1. Green Palette (Primary/Default)**

- **Status**: **ONLY ALLOWED PALETTE**.
- Used for: **ALL** Main actions, buttons, borders, backgrounds, text, and interactions.
- Values:
  - `var(--color-primary)` / `#A9D9C7` (Mint - Saving)
  - `var(--color-kibo-dark)` / `#1E4332` (Dark Green Background)
  - `var(--color-forest)` / `#477365` (Forest Green - Mid Tone)
  - `var(--color-white)` / `#F2F2F2` (Text / Foreground)

**2. Blue Palette (Living)**

- **Status**: **MANUAL SELECTION ONLY**.
- Used for: **Kibo CFO** branding and specific "Living" states.
- Values:
  - `var(--color-living)` / `#65A1C9` (Living Blue - Main)
  - `var(--color-living-dark)` / `#1A3040` (Dark Blue Background)
  - `var(--color-living-mid)` / `#3E6D8D` (Mid Tone Blue)

**3. Red Palette (Present)**

- **Status**: **MANUAL SELECTION ONLY**.
- Used for: Alerts, secondary distinctions, or "Present" states.
- Values:
  - `var(--color-present)` / `#C24656` (Red - Main)
  - `var(--color-present-dark)` / `#421C22` (Dark Red Background)
  - `var(--color-present-mid)` / `#8C333F` (Mid Tone Red)

**4. Purple Palette (Future)**

- **Status**: **MANUAL SELECTION ONLY**.
- Used for: Long-term goals, "Future" states.
- Values:
  - `var(--color-future)` / `#614FBB` (Future Purple - Main)
  - `var(--color-future-dark)` / `#231B45` (Dark Purple Background)
  - `var(--color-future-mid)` / `#463988` (Mid Tone Purple)

## Component Rules

- **Buttons**:
  - Primary: Transparent background with Green border and text (`.kibo-button-primary`). Hover fills with Green.
  - Text Links: White or Green.
- **Cards**:
  - `.kibo-card`: Dark Green background (`#1E4332`), Green border (`#A9D9C7`).
- **Inputs**:
  - Background: Secondary/Dark (`#1B4034`).
  - Border: Green (`#A9D9C7`).
  - Focus: Bright Green (`#A9D9C7`).

## Typography

- **Headings**: `Outfit` (Bold, typically Green or White).
- **Body**: `Geist Mono` or `Outfit` (Clean, readable, typically White/Foreground).

## Spacing & Layout

- **Padding**: Use generous padding (`p-6`, `p-8` for cards).
- **Layout**: Center content with `max-w-6xl` containers.
