# Design Tokens - CN Travel App

Extracted from Figma designs on 2026-01-08

## 📐 Frame Dimensions
- **Mobile viewport**: 393px × 852px (iPhone 14 Pro)
- **Primary target**: 320px–428px

## 🎨 Color Palette

### Neutral Colors
```css
--colors-neutral-0: #FFFFFF      /* White, card backgrounds */
--colors-neutral-100: #F7F7F7    /* Light gray, disabled states */
--colors-neutral-200: #EDEDED    /* Borders, back button bg */
--colors-neutral-400: #A3A7AE    /* Disabled text */
--colors-neutral-500: #8C909A    /* Progress bar fill, medium gray */
--colors-neutral-900: #182235    /* Dark text, primary content */
```

### Primary Colors
```css
--primary-dark: #101828          /* Headings, button backgrounds */
--primary-gray: #4A5565          /* Subtitles, secondary text */
--text-tertiary: #6A7282         /* Counter text (0/5 selected) */
```

### Background
```css
--background: #FBFAF9            /* Page background (warm off-white) */
```

### Tag/Pill Colors (Destination cards)
```css
--tag-background: rgba(140, 144, 154, 0.7)  /* Semi-transparent gray */
--tag-text: #FFFFFF
```

## 📝 Typography

### Font Families
```css
--font-heading: 'IBM Plex Mono', monospace
--font-body: 'Manrope', sans-serif
```

### Heading Styles
```css
/* H1 - Home page title */
font-family: IBM Plex Mono
font-weight: 700 (Bold)
font-size: 48px
line-height: 1.2 (57.6px)
color: #101828

/* H4 - Question titles */
font-family: IBM Plex Mono
font-weight: 700 (Bold)
font-size: 24px
line-height: 1.2 (28.8px)
color: #101828
```

### Body Styles
```css
/* B-2 - Body text, pill labels, button text */
font-family: Manrope
font-weight: 400 (Regular)
font-size: 16px
line-height: 1.3 (20.8px) or 24px (varies)
color: #182235 (primary) or #4A5565 (secondary)

/* B-4 - Small text, counters */
font-family: Manrope
font-weight: 400 (Regular)
font-size: 12px
line-height: 18px
color: #6A7282
```

## 📏 Spacing System

### Padding/Margins
```css
--spacing-xs: 5px   /* Gap between pills */
--spacing-sm: 10px  /* Gap in sections */
--spacing-md: 20px  /* Padding inside cards, gap between sections */
--spacing-lg: 24px  /* Page padding, section gaps */
--spacing-xl: 40px  /* Bottom bar padding */
```

### Component Spacing
- **Page padding**: 24px horizontal, 20px top
- **Section gaps**: 24px between title and content
- **Pill gaps**: 5px between pills, 10px between rows
- **Button padding**: 10px horizontal, 12px vertical
- **Card padding**: 20px all sides
- **Bottom bar padding**: 24px horizontal, 40px vertical

## 🔘 Border Radius

```css
--radius-full: 100px     /* Buttons, pills, back button */
--radius-card: 16px      /* Option cards */
--radius-image: 16px     /* Destination card images */
--radius-small: 8px      /* Small elements */
```

## 🎭 Shadows

### Card Shadow
```css
/* Destination cards */
box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.08);
```

### No shadow
- Pills, buttons, and option cards use borders instead of shadows

## 🧩 Component Specifications

### Back Button
```
Size: 23.273px × 23.273px
Border radius: 100px (circular)
Background: #EDEDED
Icon: Chevron left (gray)
```

### Progress Bar
```
Height: 6.4px
Width: 225.6px
Border radius: 32px
Background (empty): #F7F7F7
Background (filled): #8C909A
```

### Primary Button (Continue, Start Planning)
```
Width: 100% (full width)
Height: 44px
Border radius: 100px
Padding: 10px horizontal, 12px vertical
Background (active): #101828
Background (disabled): #EDEDED
Text (active): white
Text (disabled): #A3A7AE
Font: Manrope Regular 16px
```

### Secondary Button (Skip, Back)
```
Border radius: 100px
Padding: 10px horizontal, 12px vertical
Background: #EDEDED or white
Text: #464E5D or #182235
Border: 2px solid #EDEDED
Font: Manrope Regular 16px
```

### Pill Component
```
Border radius: 100px
Padding: 10px vertical, 20px horizontal
Border: 2px solid #EDEDED
Background (default): white
Background (selected): [to be confirmed - need selected state]
Text: Manrope Regular 16px, #182235
Icon: Emoji prefix
```

### Option Card (Q1 Yes/No)
```
Width: 345px (full width minus padding)
Border radius: 16px
Padding: 20px
Border: 2px solid #EDEDED
Background (active): white
Background (disabled): #F7F7F7
Gap: 8px (for icon if present)
```

### Destination Card
```
Width: ~320px (with padding)
Border radius: 16px
Image height: ~235px (60% of card)
Image border radius: 16px (top corners)
Card padding: 16px
Background: white
Shadow: 0px 2px 8px rgba(0, 0, 0, 0.08)
```

### Destination Card Tags
```
Border radius: 100px
Padding: 6px 12px
Background: rgba(140, 144, 154, 0.7) (semi-transparent)
Text: white, 12-14px
Gap: 4px between tags
```

### Day Itinerary Item
```
Image size: ~80px × 80px (square)
Image border radius: 8px
Category label: Small pill (Transport, Attraction, Food, etc.)
Title: Bold 16px
Description: Regular 14px, gray
Distance indicator: Icon + text
```

## 📱 Layout Patterns

### Top Bar
```
Height: 54px
Padding: 24px horizontal, 5px vertical
Position: Fixed top
Background: transparent
Elements: Back button + Progress bar (if onboarding)
```

### Status Bar
```
Height: 44px
iOS system status bar (time, signal, battery)
```

### Bottom Bar
```
Padding: 24px horizontal, 40px vertical
Position: Fixed bottom
Background: transparent (page background shows through)
```

### Section Container
```
Padding: 24px horizontal, 20px top
Max width: 346px (centered on mobile)
```

## 🎯 Interactive States

### Button States
```css
/* Primary Button */
Default: bg #101828, text white
Hover: [to be confirmed]
Disabled: bg #EDEDED, text #A3A7AE

/* Pill States */
Default: bg white, border #EDEDED, text #182235
Selected: [to be confirmed - appears to have darker border]
Disabled: bg #F7F7F7, opacity 50%
```

### Card States
```css
/* Option Card */
Active: bg white, border #EDEDED
Disabled: bg #F7F7F7, border #EDEDED, opacity 50%
```

## 📊 Progress Indicator
```
Format: "1 of 6" or "0 / 5 selected"
Font: Manrope Regular 12px
Color: #6A7282
Alignment: Center
```

## 🖼️ Image Treatment

### Destination Images
- Aspect ratio: ~4:3 or 16:9
- Border radius: 16px
- Fit: cover (fills container)
- Source: To be replaced with real images

### Day Itinerary Images
- Size: 80px × 80px (square thumbnails)
- Border radius: 8px
- Fit: cover

## 🔤 Content Guidelines

### Text Lengths (for design)
- Title (H1): ~20-30 characters
- Question (H4): ~40-50 characters
- Subtitle: ~60-80 characters
- Pill label: ~12-20 characters
- Destination name: ~10-20 characters
- Destination tag: ~12-15 characters each

## 📐 Touch Targets

Minimum touch target: 44px height (iOS HIG standard)

### Verified Touch Targets
- Primary button: 44px ✅
- Back button: 23px ⚠️ (small, but acceptable for secondary action)
- Pill: ~40px ✅
- Option card: ~60px+ ✅

## 🎨 Design Principles

1. **Mobile-first**: All designs optimized for 393px viewport
2. **Minimal shadows**: Relies on borders and backgrounds for depth
3. **Rounded corners**: Consistent use of full radius (100px) for interactive elements
4. **Emoji icons**: Used throughout for visual interest without custom icons
5. **Neutral palette**: Clean, calm color scheme avoiding bright colors
6. **Generous spacing**: Ample padding and gaps for touch-friendly UI
7. **Clear hierarchy**: Bold headings, clear content blocks
8. **Warm background**: #FBFAF9 instead of pure white for softer feel
