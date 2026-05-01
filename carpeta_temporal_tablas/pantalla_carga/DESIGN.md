---
name: Clinical Serenity
colors:
  surface: '#f1fcfa'
  surface-dim: '#d1dcda'
  surface-bright: '#f1fcfa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ebf6f4'
  surface-container: '#e5f0ee'
  surface-container-high: '#e0eae8'
  surface-container-highest: '#dae5e3'
  on-surface: '#141d1d'
  on-surface-variant: '#3f4946'
  inverse-surface: '#283231'
  inverse-on-surface: '#e8f3f1'
  outline: '#6f7976'
  outline-variant: '#bec9c4'
  surface-tint: '#20695b'
  primary: '#004338'
  on-primary: '#ffffff'
  primary-container: '#0a5c4e'
  on-primary-container: '#8cd2c0'
  inverse-primary: '#8ed4c2'
  secondary: '#006b5a'
  on-secondary: '#ffffff'
  secondary-container: '#8ff5dc'
  on-secondary-container: '#007260'
  tertiary: '#373b3b'
  on-tertiary: '#ffffff'
  tertiary-container: '#4e5252'
  on-tertiary-container: '#c2c5c4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#aaf0de'
  primary-fixed-dim: '#8ed4c2'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005144'
  secondary-fixed: '#8ff5dc'
  secondary-fixed-dim: '#73d8c0'
  on-secondary-fixed: '#00201a'
  on-secondary-fixed-variant: '#005143'
  tertiary-fixed: '#e0e3e2'
  tertiary-fixed-dim: '#c4c7c6'
  on-tertiary-fixed: '#181c1c'
  on-tertiary-fixed-variant: '#434847'
  background: '#f1fcfa'
  on-background: '#141d1d'
  surface-variant: '#dae5e3'
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: 64px
    fontWeight: '300'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 40px
    fontWeight: '400'
    lineHeight: 48px
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Newsreader
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.08em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 2rem
  xl: 4rem
  gutter: 24px
  margin: auto
  max-width: 1200px
---

## Brand & Style

This design system is anchored in the concept of "Clinical Serenity." It bridges the gap between rigorous medical professionalism and the holistic, restorative nature of homeopathy. The brand personality is elite, authoritative, and whisper-quiet—evoking the atmosphere of a high-end private clinic where time and attention are the ultimate luxuries.

The chosen style is **Minimalism** with a heavy emphasis on intentional whitespace and structural rhythm. By removing unnecessary decorative elements, the design system allows the high-end typography and deep emerald palette to signal quality. The interface should feel breathable, reducing cognitive load for patients and practitioners alike, ensuring every interaction feels deliberate and calm.

## Colors

The color strategy for this design system utilizes a "Deep Medical" palette. The **Deep Emerald Green** (#0A5C4E) serves as the primary anchor, representing growth, stability, and premium healthcare. The **Teal** (#158C77) is used for interactive elements and highlights, providing a slight vibrational shift that maintains the monochromatic harmony.

The background architecture relies on a Tertiary "Mist" (#F4F7F6) rather than pure white to soften the visual impact and reduce eye strain. Neutrals are tinted with a hint of green to ensure the palette feels cohesive and organic. Use the primary color for high-importance surfaces and the secondary for functional affordances like text links and active states.

## Typography

The typographic hierarchy is a dialogue between tradition and modern utility. **Newsreader** is reserved for brand moments, page titles, and editorial headers; its sophisticated serifs and varied optical sizes convey a sense of established wisdom and literary authority. 

**Inter** handles all functional UI tasks. It is chosen for its exceptional readability in clinical data contexts. Display styles should use a lighter weight to emphasize the "Elite" aesthetic, while labels use a slightly increased letter-spacing and semi-bold weight for immediate scanability in high-density medical interfaces.

## Layout & Spacing

This design system employs a **Fixed Grid** model for desktop to ensure a controlled, premium reading experience. The layout is centered on a 12-column grid with a maximum width of 1200px to prevent line lengths from becoming uncomfortable for clinical documentation.

The spacing rhythm follows an 8px base unit. To achieve the "Minimalist" clinical look, favor the larger end of the spacing scale (`lg` and `xl`) between major sections. This "macro-spacing" creates a sense of luxury and exclusivity, distinguishing the product from cluttered, lower-end healthcare portals.

## Elevation & Depth

To maintain a serene and elite aesthetic, this design system avoids heavy shadows. Depth is communicated primarily through **Tonal Layers** and **Low-Contrast Outlines**.

Surface elevation follows these rules:
- **Level 0 (Base):** The Mist (#F4F7F6) background.
- **Level 1 (Cards/Containers):** Pure White (#FFFFFF) surfaces with a subtle 1px border in a lightened version of the primary color (10% opacity).
- **Level 2 (Popovers/Modals):** Pure White with a "Clinical Glow"—a very soft, diffused shadow (0px 10px 30px) with a 5% opacity tint of the Deep Emerald Green to suggest environmental integration rather than floating detachment.

Backdrop blurs (10px - 20px) should be used on navigation bars to maintain context while keeping focus on the content.

## Shapes

The shape language is defined by "Soft Precision." By choosing **Level 1 (Soft)**, the design system utilizes a 0.25rem (4px) base corner radius. 

This subtle rounding removes the "aggression" of sharp clinical corners without veering into the playfulness of more consumer-oriented apps. It suggests a professional, high-tech environment that is still approachable. Buttons and input fields use this 4px radius, while larger containers like cards may scale up to 8px (rounded-lg) to maintain visual proportionality.

## Components

### Buttons
Primary buttons use the Deep Emerald (#0A5C4E) with white text. Secondary buttons are "Ghost" style—transparent backgrounds with a 1px Emerald border. Hover states should involve a subtle shift to the Secondary Teal (#158C77) to signal interactivity without breaking the calm.

### Input Fields
Inputs are minimalist: a soft grey bottom border that transitions to a 2px Deep Emerald border on focus. Labels sit above the field in `label-md` Inter, using the primary color to denote importance.

### Cards & Patient Records
Records should be encapsulated in Level 1 containers (White background, soft 4px corners). Use generous internal padding (24px - 32px) to ensure data-heavy clinical information remains legible.

### Progress Indicators
For homeopathic treatment tracking, use "Biological Steppers"—thin, elegant lines using the Secondary Teal, avoiding chunky or overly "gamified" progress bars.

### Chips & Tags
Used for medical categories or remedy types. These should have a light Teal background (10% opacity) with Teal text, using the `label-sm` typography for a refined, discrete appearance.