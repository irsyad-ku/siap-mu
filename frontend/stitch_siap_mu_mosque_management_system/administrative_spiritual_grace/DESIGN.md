---
name: Administrative Spiritual Grace
colors:
  surface: '#fcf8ff'
  surface-dim: '#dad7f3'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f2ff'
  surface-container: '#efecff'
  surface-container-high: '#e8e5ff'
  surface-container-highest: '#e2e0fc'
  on-surface: '#1a1a2e'
  on-surface-variant: '#3f4944'
  inverse-surface: '#2f2e43'
  inverse-on-surface: '#f2efff'
  outline: '#6f7a74'
  outline-variant: '#bec9c3'
  surface-tint: '#086b53'
  primary: '#005440'
  on-primary: '#ffffff'
  primary-container: '#0f6e56'
  on-primary-container: '#9aedcf'
  inverse-primary: '#84d6b9'
  secondary: '#006d37'
  on-secondary: '#ffffff'
  secondary-container: '#7bf8a1'
  on-secondary-container: '#007239'
  tertiary: '#005344'
  on-tertiary: '#ffffff'
  tertiary-container: '#006e5a'
  on-tertiary-container: '#68f3d0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a0f3d4'
  primary-fixed-dim: '#84d6b9'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513e'
  secondary-fixed: '#7efba4'
  secondary-fixed-dim: '#61de8a'
  on-secondary-fixed: '#00210c'
  on-secondary-fixed-variant: '#005228'
  tertiary-fixed: '#6ff9d6'
  tertiary-fixed-dim: '#4eddbb'
  on-tertiary-fixed: '#002019'
  on-tertiary-fixed-variant: '#005141'
  background: '#fcf8ff'
  on-background: '#1a1a2e'
  surface-variant: '#e2e0fc'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style
The design system for this platform focuses on **Modern Islamic Administration**, balancing the solemnity of spiritual management with the precision of modern SaaS. The brand personality is trustworthy, organized, and serene. 

The aesthetic follows a **Corporate Modern** approach with a **Tactile** twist—utilizing deep forest greens to represent growth and tradition, paired with crisp, high-utility layouts. We aim for an emotional response of "Clarity through Order," ensuring that masjid administrators feel empowered and calm while managing community resources.

## Colors
The palette is rooted in a hierarchy of greens. The **Primary** color (#0F6E56) is reserved for brand-critical elements and navigation headers to establish authority. **Secondary** and **Tertiary** greens provide vibrant accents for growth-oriented actions.

We utilize a custom Neutral scale where the "Light" neutral is not a pure grey, but a highly desaturated mint-white (#F0FAF5) to maintain the brand's warmth even in empty states. All semantic colors are adjusted for high legibility against white and light-green backgrounds.

## Typography
The system relies exclusively on **Inter** to maximize readability in data-heavy administrative screens. The scale is disciplined:
- **Headlines** use tighter letter spacing and bold weights to create a strong visual anchor.
- **Body Text** is set at 14px for standard density, ensuring complex forms remain compact yet legible.
- **Labels** use medium weights and slightly increased letter spacing to differentiate them from interactive body text.

## Layout & Spacing
This design system employs a **Fluid Grid** with a 12-column structure for desktop and a 4-column structure for mobile. 

A strict **8px soft-grid** governs all spacing (using the 4px base increment). Component internal padding should default to `md` (16px), while vertical section spacing should utilize `xl` (32px) to provide sufficient "breathability" in an otherwise dense information environment. Sidebars are fixed at 280px on desktop to ensure consistent navigation access.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Ambient Shadows**. 
- **Level 0 (Surface):** Background (#F0FAF5).
- **Level 1 (Cards/Inputs):** White (#FFFFFF) with a 1px border (#D1FAE5) and a very soft, diffused shadow (0px 4px 12px rgba(15, 110, 86, 0.05)).
- **Level 2 (Dropdowns/Modals):** White (#FFFFFF) with a more pronounced shadow to indicate focus and separation from the base grid.

The design avoids heavy black shadows, opting instead for shadows tinted with the primary green to maintain a "clean and organic" feel.

## Shapes
The shape language is "Approachable Geometric." 
- **Standard UI Elements:** (Inputs, Buttons) use a **0.5rem (8px)** radius to feel modern and friendly without being overly "bubbly."
- **Containers:** (Cards, Modals) use a **0.75rem to 1rem (12px-16px)** radius to create a distinct containerized look that separates different modules of information.
- **Status Pills:** Use a fully rounded (999px) radius to denote their state-based nature.

## Components

### Buttons
- **Primary:** Features a linear gradient from #0F6E56 to #27AE60 (left-to-right). Text is white, semi-bold.
- **Secondary:** Outlined with Primary color, 1px stroke.
- **Hover States:** Gradients should shift slightly in luminosity (+10%) rather than changing hue.

### Cards
- **Structure:** White background, 12px corner radius.
- **Border:** Constant 1px solid #D1FAE5.
- **Content:** 24px internal padding (lg) for headers, 16px (md) for body content.

### Sidebar & Navigation
- **Theme:** Dark Mode. Background: #085041.
- **Active State:** A subtle left-aligned vertical bar (4px) in Secondary green (#27AE60) with a low-opacity background highlight.
- **Icons:** Linear, 24px, white with 0.8 opacity for inactive states.

### Forms
- **Input Fields:** Utilize "Floating Labels" (Bootstrap 5 style). 
- **Focus State:** 2px solid #0F6E56 with a soft green glow (ring).
- **Validation:** Error text in #E74C3C, using 12px Label-md typography.

### Status Badges
- **Style:** Pill-shaped, low-opacity background of the semantic color with high-opacity text of the same color (e.g., Success badge: Background 10% alpha of #2ECC71, Text #2ECC71).