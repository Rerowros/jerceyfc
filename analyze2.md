# Analyze2 — navigation back test (after first optimizations, before your new changes)

Date: 2025-12-14
Target: navigation back from `/projects/hotel-winui` → `/projects`
Environment: Fast 4G + CPU 3.4× (mid-tier mobile), headless Chromium

## Action

- Clicked element that navigates back to `/projects` (found a link/button on project page)

## Frames sampled during navigation

- frames sampled: 270
- mean: 17.868 ms
- median: 14.9 ms
- p90: 29 ms
- p99: 37.1 ms
- % frames >16 ms: ~40.7%

## Long tasks (sample)

- sample long tasks durations (ms): 94, 55, 197

## Trace insights

- ForcedReflow observed in trace bounds during navigation
- DOMSize insight flagged in part of trace (could influence style/layout costs)

## Interpretation

- Navigation produces higher frame times and higher p90/p99 compared to hover interaction: spikes likely from main-thread routing/rehydration and layout work.

(Next: run a new navigation-back test after your latest changes and save as `analyze3`.)
