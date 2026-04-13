# Sparkline Feedback Card Animation

## Context

The "Structure Actionable Feedback" feature card currently uses a `CursorScheduler` animation — an animated cursor clicking days on a calendar grid. This doesn't communicate what the card is about (tracking improvement over time). Replacing it with an animated sparkline chart that visually tells the story of a trainee's performance improving across sessions.

## Component

**File:** `src/components/features/SparklineProgress.jsx` (replaces `CursorScheduler`)

**Container:** Same `h-48` constraint as sibling cards. Pure React + inline SVG, no additional dependencies.

## Layout (top to bottom)

1. **Header row** — "RESPONSE ACCURACY" label (left) + animated score "94.2%" (right)
2. **Sparkline SVG** — polyline with 6 data points, area fill beneath
3. **Session labels** — "S1" through "S6" evenly spaced below data points

## Data Points

```
S1: 62%, S2: 58%, S3: 71%, S4: 75%, S5: 82%, S6: 94%
```

The dip at S2 adds realism — training progress isn't linear.

## Animation Sequence (~4.5s cycle)

| Phase | Duration | What happens |
|-------|----------|--------------|
| Line draw | ~1.8s | `strokeDashoffset` 100%→0%, `ease-out`, left to right |
| Data points | staggered ~300ms each | Circles (r=3) scale 0→1 with bounce easing as line reaches them |
| Area fill | 600ms | `clay/10` gradient beneath line, opacity 0→1 |
| Score count-up | 800ms | Top-right percentage counts 0→94.2% via `requestAnimationFrame` |
| Hold | 2000ms | Everything visible |
| Fade out | 400ms | Opacity 0, then 500ms pause before restart |

## Visual Tokens

| Element | Style |
|---------|-------|
| Line | 2px stroke, `stroke: #CC5833` (clay), round caps/joins |
| Data points | `fill: clay`, `stroke: cream` (1px), r=3 |
| Point entrance | `cubic-bezier(0.34, 1.56, 0.64, 1)` scale — matches DiagnosticShuffler bounce |
| Area gradient | Linear from `clay/15` at line → `transparent` at bottom |
| Final score | `font-heading font-bold text-lg text-clay` |
| Header label | `font-mono text-[10px] text-charcoal/40 uppercase tracking-widest` |
| Session labels | `font-mono text-[9px] text-charcoal/30` |

## Implementation Approach

- **Line draw:** SVG `strokeDasharray` / `strokeDashoffset` transition (same technique used widely, no library needed)
- **Sequencing:** `async/await` with `setTimeout` promises + cancellation flag (same pattern as `CursorScheduler`)
- **Score count-up:** `requestAnimationFrame` loop interpolating 0→target over 800ms
- **Data point appearance:** Timed to line progress — each point appears when the line draw has reached its x-position (~300ms stagger)

## Integration Changes

- Create `src/components/features/SparklineProgress.jsx`
- Update `src/components/Features.jsx`: replace `CursorScheduler` import with `SparklineProgress` in `CARDS[2]`
- `CursorScheduler.jsx` can be deleted

## Verification

1. Run dev server (`npm run dev`)
2. Scroll to Features section
3. Confirm: line draws smoothly left-to-right, points pop in with bounce, area fill fades in, score counts up, cycle restarts cleanly
4. Confirm: no jank on page load or rapid scrolling
5. Confirm: animation cleans up on unmount (no console errors navigating away)
6. Check responsive: card maintains layout at mobile and desktop widths
