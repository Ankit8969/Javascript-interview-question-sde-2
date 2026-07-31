# Web Vitals — Core Performance Metrics

Web Vitals is a Google initiative that provides unified guidance for quality signals
essential to delivering a great user experience on the web.  
The five metrics below are the ones every frontend engineer should understand deeply.

---

## Table of Contents

1. [FCP — First Contentful Paint](#1-fcp--first-contentful-paint)
2. [LCP — Largest Contentful Paint](#2-lcp--largest-contentful-paint)
3. [INP — Interaction to Next Paint](#3-inp--interaction-to-next-paint)
4. [CLS — Cumulative Layout Shift](#4-cls--cumulative-layout-shift)
5. [TTFB — Time to First Byte](#5-ttfb--time-to-first-byte)
6. [Quick Reference Table](#6-quick-reference-table)

---

## 1. FCP — First Contentful Paint

### What is it?
FCP measures the time from when the page starts loading to when **any** part of the
page's content (text, image, SVG, non-white `<canvas>`) is first rendered on screen.

### Why does it matter?
It is the first signal users get that something is actually happening.
A slow FCP makes the page feel broken or unresponsive.

### Thresholds

| Score | Value |
|-------|-------|
| ✅ Good | ≤ 1.8 s |
| ⚠️ Needs Improvement | 1.8 s – 3.0 s |
| ❌ Poor | > 3.0 s |

### Common Causes of Poor FCP
- Render-blocking CSS or JavaScript
- Slow server response (high TTFB)
- Large page weight (unoptimised assets)
- No resource hints (`preload`, `preconnect`)

### How to Improve
- Eliminate render-blocking resources (`<link rel="preload">`, `async`/`defer` on scripts)
- Inline critical CSS
- Reduce server response time (CDN, caching)
- Use efficient font loading strategies (`font-display: swap`)
- Enable text compression (gzip / Brotli)

---

## 2. LCP — Largest Contentful Paint

### What is it?
LCP measures the time from when the page starts loading to when the **largest visible
content element** (image, video poster, block-level text node) is fully rendered in
the viewport.

### Why does it matter?
LCP marks the point at which the main content of the page has likely loaded — a good
proxy for perceived load speed. It is a **Core Web Vital** and directly affects
Google Search ranking.

### Thresholds

| Score | Value |
|-------|-------|
| ✅ Good | ≤ 2.5 s |
| ⚠️ Needs Improvement | 2.5 s – 4.0 s |
| ❌ Poor | > 4.0 s |

### Elements Considered for LCP
- `<img>` elements
- `<image>` inside an SVG
- `<video>` (poster image)
- Elements with a CSS `background-image`
- Block-level elements containing text nodes

### Common Causes of Poor LCP
- Slow server response times
- Render-blocking JavaScript / CSS
- Slow resource load times (large hero images, unoptimised fonts)
- Client-side rendering with heavy JavaScript bundles

### How to Improve
- Preload the LCP image: `<link rel="preload" as="image" href="hero.webp">`
- Serve images in next-gen formats (WebP, AVIF)
- Use a CDN to reduce resource load latency
- Apply `fetchpriority="high"` on the LCP `<img>`
- Avoid lazy-loading the LCP element
- Minimise critical path CSS

---

## 3. INP — Interaction to Next Paint

### What is it?
INP measures the **overall responsiveness** of a page to user interactions (clicks,
taps, keyboard input). It observes the latency of all qualifying interactions during
the page lifecycle and reports the **worst-case** (or near-worst-case at the 98th
percentile) interaction delay.

> INP replaced FID (First Input Delay) as a Core Web Vital in March 2024.

### Why does it matter?
A high INP means users experience sluggish responses when they interact with the
page — buttons feel laggy, forms are unresponsive, carousels stutter.

### Thresholds

| Score | Value |
|-------|-------|
| ✅ Good | ≤ 200 ms |
| ⚠️ Needs Improvement | 200 ms – 500 ms |
| ❌ Poor | > 500 ms |

### How INP is Measured
An interaction = `input delay` + `processing time` + `presentation delay`

```
User action
    │
    ▼
[  input delay  ] → [  processing (event handlers)  ] → [  presentation delay  ] → Paint
```

### Common Causes of Poor INP
- Long-running JavaScript tasks (> 50 ms) blocking the main thread
- Large JavaScript bundles parsed on load
- Excessive DOM size (layout / style recalculations)
- Third-party scripts monopolising the main thread

### How to Improve
- Break long tasks into smaller chunks using `setTimeout` / `scheduler.yield()`
- Use Web Workers for CPU-intensive work
- Debounce / throttle high-frequency event handlers
- Code-split and lazy-load non-critical JavaScript
- Minimise DOM depth and element count
- Defer non-critical third-party scripts

---

## 4. CLS — Cumulative Layout Shift

### What is it?
CLS measures the **visual stability** of a page. It quantifies unexpected layout
shifts — elements moving around the screen without user interaction (e.g., ads
popping in and pushing content down).

### Why does it matter?
Unexpected shifts are jarring, cause mis-clicks, and erode user trust.
CLS is a **Core Web Vital** and a Google Search ranking signal.

### Thresholds

| Score | Value |
|-------|-------|
| ✅ Good | ≤ 0.1 |
| ⚠️ Needs Improvement | 0.1 – 0.25 |
| ❌ Poor | > 0.25 |

### How the Score is Calculated

```
Layout Shift Score = Impact Fraction × Distance Fraction
```

- **Impact fraction** — fraction of the viewport affected by the shifted element
- **Distance fraction** — largest distance (relative to viewport) the element moved
- CLS aggregates all layout shift scores within **session windows** and reports the
  worst window's total.

### Common Causes of Poor CLS
- Images / videos without explicit `width` and `height` attributes
- Ads, embeds, or iframes without reserved space
- Dynamically injected content (banners, cookie notices) above existing content
- Web fonts causing FOIT / FOUT (Flash of Invisible / Unstyled Text)
- Animations that change layout-triggering properties (top, left, width, height)

### How to Improve
- Always set `width` and `height` (or `aspect-ratio`) on media elements
- Reserve space for ads / dynamic content with CSS `min-height` placeholders
- Use `font-display: optional` or `font-display: swap` carefully
- Prefer CSS `transform` and `opacity` for animations (composited layers, no layout)
- Inject new UI below the fold, not above existing content

---

## 5. TTFB — Time to First Byte

### What is it?
TTFB measures the time between the browser's request for a page and when it
receives the **first byte** of the server's response.

It covers:
1. DNS lookup
2. Connection establishment (TCP + TLS handshake)
3. Request travel time to server
4. Server processing time
5. First byte of the response travelling back

### Why does it matter?
TTFB is the foundation on which all other metrics are built.
A slow TTFB cascades into slow FCP, LCP, and everything else.
While not a Core Web Vital itself, it is a **diagnostic metric** used to identify
server and network issues.

### Thresholds

| Score | Value |
|-------|-------|
| ✅ Good | ≤ 800 ms |
| ⚠️ Needs Improvement | 800 ms – 1800 ms |
| ❌ Poor | > 1800 ms |

### Common Causes of Poor TTFB
- Slow backend / database queries
- No server-side caching
- Server located far from the user (no CDN)
- Slow DNS resolution
- No HTTP/2 or HTTP/3

### How to Improve
- Use a CDN to serve static assets and cache responses closer to users
- Enable server-side caching (Redis, Varnish, edge caching)
- Optimise database queries and use connection pooling
- Use HTTP/2 (multiplexing) or HTTP/3 (QUIC)
- Prefetch DNS with `<link rel="dns-prefetch">`
- Use edge functions / serverless at the edge for dynamic responses

---

## 6. Quick Reference Table

| Metric | Full Name | What it Measures | Good Threshold | Core Web Vital |
|--------|-----------|-----------------|----------------|---------------|
| **FCP** | First Contentful Paint | First content rendered | ≤ 1.8 s | No |
| **LCP** | Largest Contentful Paint | Largest element rendered | ≤ 2.5 s | ✅ Yes |
| **INP** | Interaction to Next Paint | Worst interaction latency | ≤ 200 ms | ✅ Yes |
| **CLS** | Cumulative Layout Shift | Visual stability | ≤ 0.1 | ✅ Yes |
| **TTFB** | Time to First Byte | Server response speed | ≤ 800 ms | No (diagnostic) |

---

## Measuring Web Vitals

### In the Browser (JavaScript)

```js
import { onFCP, onLCP, onINP, onCLS, onTTFB } from 'web-vitals';

onFCP(console.log);
onLCP(console.log);
onINP(console.log);
onCLS(console.log);
onTTFB(console.log);
```

### Tools
| Tool | Use Case |
|------|----------|
| **Chrome DevTools** → Performance / Lighthouse tab | Local profiling |
| **PageSpeed Insights** (pagespeed.web.dev) | Real-world + lab data |
| **Chrome UX Report (CrUX)** | Field data from real users |
| **WebPageTest** | Deep waterfall analysis |
| **Lighthouse CI** | Automated CI/CD gating |

---

## Key Takeaways for Interviews

- The three **Core Web Vitals** are **LCP**, **INP**, and **CLS** — these directly
  impact Google Search rankings.
- **FCP** and **TTFB** are important *diagnostic* metrics but are not Core Web Vitals.
- **INP replaced FID** in March 2024 because INP captures the full interaction
  lifecycle, not just the first interaction.
- CLS score is **dimensionless** (not time-based); all other metrics are measured
  in milliseconds or seconds.
- Improving TTFB almost always also improves FCP and LCP — fix the server first.
