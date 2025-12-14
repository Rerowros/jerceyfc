# Analyze5 — navigation back test (repeat)

Date: 2025-12-14
Target: navigation back from `/projects/hotel-winui` → `/projects`
Environment: Fast 4G + CPU 3.4× (mid-tier mobile), headless Chromium

## Action

- Clicked element that navigates back to `/projects` (found link/button on project page)

## Frames sampled during navigation

- frames sampled: 399
- mean: 15.078 ms
- median: 12.4 ms
- p90: 20.8 ms
- p99: 43.2 ms
- % frames >16 ms: ~20.8%

## Long tasks (sample)

- sample long tasks durations (ms): 98, 64, 146, 169

## Trace insights

- INP observed (36 ms) for an interaction in trace.
- ForcedReflow observed in trace bounds during navigation.
- DOMSize insight present in parts of the trace.

## Comparison vs `analyze4`

- `analyze4` mean: 18.269 ms → `analyze5` mean: 15.078 ms (improvement)
- p90: 28.8 ms → 20.8 ms (improved)
- p99: 39.9 ms → 43.2 ms (slightly worse tail)
- % frames >16ms: ~37.9% → ~20.8% (noticeable improvement)

## Interpretation

- This run shows better frame stability during navigation compared to `analyze4` (lower mean, lower p90, lower %>16ms). Some large long tasks still occur (146–169 ms), so there's still room to optimize main thread work.

(Report saved as `analyze5.md`.)
