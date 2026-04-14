# Enterprise Pricing Card — Luminous Border Upgrade

## Context

The enterprise pricing card (`src/components/Pricing.jsx`) currently feels visually flat — a plain charcoal card with minimal styling beyond a noise texture and hover scale effect. The goal is to elevate it to feel premium and luxurious through subtle visual refinements, without changing any content or adding new pricing tiers.

## Design

### Animated Gradient Border

- Wrap the existing card in a container `div` that displays a `conic-gradient` background
- Gradient colors: clay `#CC5833` through warm gold `#D4915C` and back
- The inner card overlays this wrapper with a 2px gap, creating the visible border
- A CSS `@keyframes` animation (`spin-border`) rotates the gradient origin continuously at ~8s per full rotation
- The wrapper gets `rounded-[2.125rem]` (card's `rounded-4xl` 2rem + 2px border)

### Soft Outer Glow

- Apply a `box-shadow` to the border wrapper: `0 0 40px rgba(204, 88, 51, 0.15)`
- Creates a warm ambient halo around the card

### Inset Lit-Edge

- Add an `inset` box-shadow to the inner card: `inset 0 1px 1px rgba(242, 240, 233, 0.05)`
- Simulates light catching the top edge of a beveled surface
- Complements the existing noise texture for a tactile material feel

### Sizing Adjustments

- Card max-width: `max-w-md` (28rem) -> `max-w-lg` (32rem)
- Card padding: `p-8 md:p-10` -> `p-10 md:p-14`
- More breathing room signals premium

## Files to Modify

### `src/index.css`

Add the border rotation keyframes and luminous border wrapper styles:

```css
/* Luminous rotating border for enterprise card */
@property --border-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin-border {
  from { --border-angle: 0deg; }
  to   { --border-angle: 360deg; }
}

.luminous-border {
  background: conic-gradient(from var(--border-angle), #CC5833, #D4915C, #CC5833);
  animation: spin-border 8s linear infinite;
  padding: 2px;
  border-radius: 2.125rem;
  box-shadow: 0 0 40px rgba(204, 88, 51, 0.15);
}
```

Note: `@property` must be at the top level of the stylesheet (CSS Houdini requirement). It registers `--border-angle` so the browser can interpolate it smoothly in the keyframes. Fallback: if `@property` is unsupported (Firefox < 128), the gradient renders as a static border which still looks premium.

### `src/components/Pricing.jsx`

1. Add a `.luminous-border` wrapper div around the existing card div
2. Move the `.pricing-card` class from the inner card to the wrapper — GSAP targets this class for the scroll-trigger entrance animation, so the entire unit (border + card) must animate together
3. Update the outer section: `max-w-md` -> `max-w-lg`
4. Update the inner card padding: `p-8 md:p-10` -> `p-10 md:p-14`
5. Add the inset shadow to the inner card: `shadow-[inset_0_1px_1px_rgba(242,240,233,0.05)]`

## What Stays the Same

- Content (title, tagline, features list, button, onboarding note)
- GSAP scroll-trigger entrance animation
- Noise texture overlay
- Hover scale/ring effects
- MagneticButton component

## No New Dependencies

The rotating gradient uses pure CSS (`@property` + `conic-gradient` + `@keyframes`). No additional libraries needed. This is more performant than GSAP for continuous animations.

## Verification

1. Run `npm run dev` and navigate to the pricing section
2. Confirm the gradient border is visible and rotating smoothly
3. Confirm the soft glow halo is present
4. Confirm the card has more generous spacing
5. Check mobile viewport — border and glow should render without mouse interaction
6. Confirm hover effects (scale, ring) still work on top of the new border
7. Confirm the scroll-trigger entrance animation still fires correctly
8. Test in Chrome, Safari, Firefox — if `@property` is unsupported (Firefox < 128), confirm graceful fallback to a static gradient border
