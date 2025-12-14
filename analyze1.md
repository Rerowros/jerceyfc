# Analyze1 — baseline test data (before/at change commit)

Date: 2025-12-14
Target: `hotel-winui` card on /projects
Environment: Fast 4G + CPU 3.4× (mid-tier mobile), headless Chromium

## Baseline rAF frame sampling (hover, 6–8s)

- mean: ~14.1 ms
- median: ~13.6 ms
- p90: ~18.5 ms
- frames sampled: ~440

## Long tasks (sample)

Several long tasks observed during hover, example durations (ms):

- 186, 156, 154, 138, 121, 99, 91, 90, 89, 88, 87, ...
  (Full list exists in trace insights.)

## Trace insights

- ForcedReflow observed (~152 ms) in `ClientRouter...js` (layout/read-write causing reflow).
- Main thread (JS/layout) is largest contributor to 'freezes'.

## Per-card hover (previous sample of first 6 cards)

- vpn-webapp: hover mean ~15.88 ms, %>16ms ~41.6%
- glasses-ai-shop: hover mean ~16.75 ms, %>16ms ~48.3%
- ai-video-gen: hover mean ~17.51 ms, %>16ms ~70.9%
- hotel-winui: hover mean ~18.72 ms, %>16ms ~77.0% <-- highest
- megafon-ssr: hover mean ~18.07 ms, %>16ms ~72.5%
- telegram-stars: hover mean ~18.57 ms, %>16ms ~66.0%

## Quick experiments (before change)

- Disable `backdrop-filter` on `hotel-winui` → hover mean ~18.46 ms (no improvement).
- Hide image on `hotel-winui` → hover mean ~20.63 ms (worse).
- Force `translateZ(0)` on card → hover mean ~18.17 ms (some improvement).

---

(Next: perform new test after applied optimizations described by you.)

---

# After changes — new test (post‑optimizations)

Date: 2025-12-14
Changes applied (per your message):

- Added `will-change: transform` to card and glare (promote to compositing layer).
- Removed `backdrop-blur-sm` from lower part of card and replaced with `bg-[var(--color-card)]`.
- Simplified `mousemove` handler (only sets `mouseX`/`mouseY`), heavy math moved into rAF.
- `isHovering` logic smooths exit; loop winds down gracefully.
- Added explicit `translateZ` to inner layers (noise, glare) to force promotion.

## New rAF frame sampling (hover, 8s)

- frames sampled: 750
- mean: 10.948 ms
- median: 10.2 ms
- p90: 13.9 ms
- p99: 18.3 ms
- % frames >16ms: ~4.13%

## Long tasks

- long tasks observed: 200 (sampled), examples (ms): 156, 154, 63, 121, 186, 138, 99, 59 ... (see collected trace)
- Note: long tasks still present but frequency of frame jank decreased significantly compared to baseline.

## Quick comparison

- mean frame time improved: ~14.1 ms → ~10.95 ms (~22% improvement)
- p90 improved from ~18.5 ms → ~13.9 ms
- % frames >16ms dropped from ~42% (baseline hotel hover ~77% over 16ms in earlier measurement) to ~4.1% in this run (large reduction in high-latency frames).
- Long tasks still exist (some large ones remain), indicating remaining main-thread work (forced reflows or background tasks), but rendering jank during hover is much reduced.

## Preliminary conclusion

- The stated optimizations produced a measurable improvement in frame times for the `hotel-winui` hover case: lower mean/median/p90 and far fewer frames over 16ms. This suggests that promoting layers and reducing per‑mousemove work effectively improved smoothness.
- Next step: analyze remaining long tasks (trace flamechart) to find and mitigate the largest main‑thread blockers (e.g., forced reflow in `ClientRouter...js`).

(If you want, я могу: 1) построить визуальный flamechart PNG по текущ trace и выделить топ‑3 функций, 2) пробовать более точечные оптимизации JS/layout.)
