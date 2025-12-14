# Analyze4 — navigation back test (after your latest restart/changes)

Date: 2025-12-14
Target: navigation back from `/projects/hotel-winui` → `/projects`
Environment: Fast 4G + CPU 3.4× (mid-tier mobile), headless Chromium

## Action

- Clicked element that navigates back to `/projects` (found link/button on project page)

## Frames sampled during navigation

- frames sampled: 264
- mean: 18.269 ms
- median: 14.8 ms
- p90: 28.8 ms
- p99: 39.9 ms
- % frames >16 ms: ~37.9%

## Long tasks (sample)

- sample long tasks durations (ms): 93, 56, 136, 160

## Trace insights

- INP observed (57 ms) for an interaction in trace (see insight `INPBreakdown`).
- ForcedReflow observed in trace bounds during navigation (similar to previous runs).
- DOMSize insight present in parts of the trace.

## Comparison vs `analyze3`

- `analyze3` mean: 17.891 ms → `analyze4` mean: 18.269 ms (no meaningful improvement; small regression within noise).
- `analyze3` p90: 30.4 ms → `analyze4` p90: 28.8 ms (slightly better tail here).
- `analyze3` p99: 48.9 ms → `analyze4` p99: 39.9 ms (improved tail in this run).
- % frames >16ms: `analyze3` ~41.3% → `analyze4` ~37.9% (small improvement).

## Interpretation

- Overall navigation performance is roughly the same across runs (minor run‑to‑run variance). Some tail metrics improved in this run (p99 decreased), but mean stayed similar. Long main‑thread tasks (forced reflows, router work) remain the primary source of spikes.

## Next recommended steps

- Generate a flamechart PNG for navigation trace and highlight top main‑thread callers (ClientRouter, prefetch handlers, or other expensive functions). This will show where to target optimizations.
- Optionally run an A/B test by disabling router prefetch / ClientRouter to measure isolated impact.

(Report saved as `analyze4.md`.)
