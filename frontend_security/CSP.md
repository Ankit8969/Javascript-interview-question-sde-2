Content Security Policy (CSP)
---

### 🔐 What is CSP (Content Security Policy)?
Content Security Policy (CSP) is a browser security mechanism that helps prevent:

- Cross-Site Scripting (XSS)

- Data Injection attacks

- Click jacking

- Malicious inline scripts/styles

CSP allows you to control which resources (scripts, styles, images, etc.) the browser is allowed to load and execute on your web page.

Why CSP ?
---
| Problem                          | CSP Defense                                               |
| -------------------------------- | --------------------------------------------------------- |
| **XSS attacks**                  | Prevents execution of unauthorized inline scripts         |
| **External malicious resources** | Blocks loading of resources from untrusted domains        |
| **Mitigates data exfiltration**  | Restricts where data (e.g., form submissions) can be sent |


Example CSP Header
```
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; style-src 'self' 'unsafe-inline'; img-src 'self' data:;

```


Explanation of Directives:
---
| Directive                                   | Meaning                                              |
| ------------------------------------------- | ---------------------------------------------------- |
| `default-src 'self'`                        | Only allow resources from the same origin            |
| `script-src 'self' https://apis.google.com` | Only allow scripts from self and Google APIs         |
| `style-src 'self' 'unsafe-inline'`          | Allow inline styles (unsafe but sometimes necessary) |
| `img-src 'self' data:`                      | Allow images from self and inline Base64 data URIs   |


### CSP Directives You’ll Commonly Use:

| Directive                  | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `default-src`              | Fallback for all resource types          |
| `script-src`               | Controls JS script sources               |
| `style-src`                | Controls CSS sources                     |
| `img-src`                  | Controls image sources                   |
| `font-src`                 | Controls font sources                    |
| `connect-src`              | Controls AJAX/WebSocket endpoints        |
| `frame-src`                | Controls what can be embedded in iframes |
| `report-uri` / `report-to` | Where browser sends violation reports    |


### Things CSP can block

| Scenario                                    | CSP Will Block? |
| ------------------------------------------- | --------------- |
| Inline `<script>` without `'unsafe-inline'` | ❌ Blocked       |
| External script from unlisted domain        | ❌ Blocked       |
| AJAX requests to unlisted API endpoint      | ❌ Blocked       |
| Form POST to untrusted domain               | ❌ Blocked       |


### NOTE: 
CSP is like a firewall in the browser. It restricts which scripts, styles, images, and other resources can load and execute, reducing attack vectors like XSS.

The Content Security Policy (CSP) headers need to be sent as part of the HTTP response headers from your backend server.


### ❌ Why is 'unsafe-inline' Dangerous in CSP?
| Problem                                                              | Explanation                                                                                                                                                                  |
| -------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Allows inline `<script>` execution**                               | By adding `'unsafe-inline'` to `script-src`, you're telling the browser to allow **inline JavaScript code**, which defeats the main purpose of CSP (preventing XSS attacks). |
| **XSS Attack Vector Remains Open**                                   | If an attacker finds a way to inject a `<script>` tag or inline `onclick="maliciousCode()"` into your page, `'unsafe-inline'` will allow it to execute.                      |
| **Weakens CSP's Power**                                              | Without `'unsafe-inline'`, the browser will block any inline `<script>`, forcing you to use safer alternatives like **nonce-based scripts** or **hashed scripts**.           |
| **Browsers can't differentiate between good and bad inline scripts** | Adding `'unsafe-inline'` allows **all inline scripts**, including potentially malicious ones injected via XSS vulnerabilities.                                               |


## Summary 

### What CSP does (in simple terms)
- Control what resources can load
- You decide which domains are trusted for scripts, styles, images, fonts, iframes, etc.

Example:
```
script-src 'self' https://cdn.trusted.com
```
- Only your domain and trusted CDN can serve JavaScript.Prevent - malicious script injection (XSS protection)
- Attackers often try to inject ```<script>``` tags or inline JS.

### With CSP, you can block inline scripts ```('unsafe-inline')``` and disallow ```eval() ('unsafe-eval')```.

Example:
```
script-src 'self'; 
```
- No inline JS, no external untrusted JS.

### Prevent Click jacking (via frame-ancestors)

Attackers could embed your site inside an ```<iframe>``` and trick users into clicking buttons.

Example:
```
frame-ancestors 'none';
```
- Nobody can put your site inside an iframe.

### Restrict who can embed your content

Example:
```
frame-ancestors 'self' https://trusted-app.com;
```

Only your own domain and trusted app can embed your pages in an iframe.

### Refined version of what you said
- With the help of CSP headers, we can control what kind of resources (JS, CSS, images, fonts, etc.) our application is allowed to load, and from which sources.

- CSP also helps prevent script injection attacks (XSS) by blocking inline/untrusted scripts.

- Additionally, CSP can protect against clickjacking by restricting or blocking embedding of our site in iframes (frame-ancestors).