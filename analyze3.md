# Analyze3 — navigation back test (after your latest changes and restart)

Date: 2025-12-14
Target: navigation back from `/projects/hotel-winui` → `/projects`
Environment: Fast 4G + CPU 3.4× (mid-tier mobile), headless Chromium

## Action

- Clicked element that navigates back to `/projects` (found a link/button on project page)

## Frames sampled during navigation

- frames sampled: 269
- mean: 17.891 ms
- median: 15.5 ms
- p90: 30.4 ms
- p99: 48.9 ms
- % frames >16 ms: ~41.26%

## Long tasks (sample)

- sample long tasks durations (ms): 80, 53, 111, 118

## Trace insights

- ForcedReflow present in trace bounds during navigation (similar to previous run)
- DOMSize insight also present in trace

## Comparison vs `analyze2`

- `analyze2` mean: 17.868 ms → `analyze3` mean: 17.891 ms (no meaningful change)
- p90 increased slightly from 29 → 30.4 ms; p99 increased from 37.1 → 48.9 ms (worse tail in this run)
- % frames >16ms: ~40.7% → ~41.3% (no meaningful change)
- Long tasks pattern changed slightly (different samples), but heavy tasks remain during navigation.

## Interpretation

- Recent changes after `analyze2` did not materially affect navigation‑back performance. Navigation-related main‑thread work (routing/rehydration/DOM work) remains the primary source of spikes.
- Next recommended step: analyze the navigation trace flamechart to find top main‑thread callers (e.g., ClientRouter or prefetch handlers) and target them.

(If you want, я могу: 1) построить flamechart PNG и выделить топ‑3 вызова в main thread, или 2) экспериментально отключить ClientRouter/prefetch to isolate its impact.)
