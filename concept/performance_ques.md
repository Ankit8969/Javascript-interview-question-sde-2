## Important Interview question

### You notice a memory leak in a production SPA—how do you identify and fix it?
- First, I'd confirm that it's actually a memory leak rather than legitimate memory growth. I'd reproduce the issue in production-like conditions and use Chrome DevTools Memory/Performance tools to take heap snapshots at different points in time.

- I'd perform the same action repeatedly—for example, navigating to a page, opening a modal, or mounting/unmounting a component—and check whether memory keeps increasing after the component is destroyed and garbage collection occurs.

- Then I'd compare heap snapshots and look at retained objects and their retaining paths. In a React SPA, I'd specifically look for things like event listeners that weren't removed, timers or intervals, WebSocket/subscription connections, pending promises/callbacks, global references, large caches, and DOM nodes retained by closures.

- Once I identify the retaining reference, I'd fix the lifecycle cleanup—for example, remove event listeners, clear timers, unsubscribe from WebSockets, abort pending requests, or clean up external library instances. Finally, I'd reproduce the same scenario and verify through another heap snapshot that the objects are actually being garbage collected.


| Potential leak               | Cleanup                          |
| ---------------------------- | -------------------------------- |
| `setInterval` / `setTimeout` | `clearInterval` / `clearTimeout` |
| `addEventListener`           | `removeEventListener`            |
| WebSocket                    | `close()`                        |
| GraphQL subscription         | `unsubscribe()`                  |
| Fetch requests               | `AbortController`                |
| RxJS subscription            | `unsubscribe()`                  |
| Third-party chart/editor     | `destroy()`                      |
| Large cache                  | Eviction/TTL/size limits         |
| Closures                     | Remove unnecessary references    |
| DOM references               | Release detached nodes           |



### How would you optimize a React application rendering 100k+ items in a list?
- We can use Virtualization and render few entries only

### What strategies would you use to improve page load time for a global audience?
- Reduce initial bundle size - it will quickly load the application in user device.
- We may use SSR which will decrease the load time and load the page quickly
- We can use CDN which will cached the static content and deliver quickly, HTTP caching headers.
- Compression Header (gzip, brotli)

### How do you ensure secure handling of sensitive user data on the client side?
- I avoid storing sensitive data on the client unless it is absolutely necessary. Authentication and authorization are enforced on the backend, so I never rely on frontend checks for security.

- For authentication, I prefer secure, HttpOnly, Secure, SameSite cookies for session/refresh tokens rather than storing long-lived tokens in localStorage, because JavaScript cannot directly access HttpOnly cookies.

- I minimize sensitive data in Redux, localStorage, sessionStorage, URLs, logs, and browser caches. If sensitive data is temporarily required in memory, I keep its lifetime as short as possible and clear it when it's no longer needed.

- I also protect against XSS by avoiding unsafe HTML rendering, sanitizing untrusted content when HTML is required, and using a strong Content Security Policy. I use HTTPS everywhere and ensure sensitive API calls have proper authentication, authorization, CSRF protection where applicable, and server-side validation.

- Finally, I make sure sensitive information isn't accidentally exposed through error messages, analytics events, console logs, source maps, or client-side configuration.


### Users report intermittent UI glitches in different browsers—how would you troubleshoot?
- First, I’d identify whether the issue is browser-specific, device-specific, or related to our application code. I’d collect the browser/version, OS, affected page, exact steps, screenshots or console errors, and whether the issue is reproducible.

- Then I’d reproduce it across browsers such as Chrome, Firefox, Safari, and Edge, ideally using the same test data. I’d check the Console, Network, DOM/CSS, and Performance panels to determine whether the problem is caused by JavaScript, CSS rendering, API behavior, or timing.

- For UI-specific issues, I’d particularly check browser differences in CSS support, flex/grid behavior, fonts, viewport dimensions, event handling, and Web APIs. I’d also verify responsive breakpoints and zoom/device-pixel-ratio differences.

- If it’s intermittent, I’d look for race conditions, async API responses, stale state, timing-dependent effects, WebSocket events, or unhandled promises. I’d add targeted logging/error tracking with browser and version information to identify patterns in production.

- Once I isolate the root cause, I’d fix it with the smallest cross-browser-compatible change, add a regression test—preferably through Playwright—and verify it across the affected browser matrix before releasing


