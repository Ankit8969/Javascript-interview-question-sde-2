CSRF
---
CSRF (Cross-Site Request Forgery) is a web security vulnerability where an attacker tricks a user’s browser into making unwanted requests to a trusted website on which the user is authenticated, without their consent or knowledge

## How does CSRF work?
- Most web apps rely on browser cookies to keep users logged in.

- When you visit a malicious website while logged in to a different site (such as your bank or email), that malicious site can force your browser to send requests (like money transfers or account changes) to the trusted site using your authentication cookies, exploiting the trust the site has in your session.

- The server cannot distinguish between requests made intentionally by the user and those forged by the attacker, as the requests appear legitimate.

Example Attack Scenario
---
1. You’re logged in to your bank in one browser tab.

2. In another tab, you visit a malicious site.

3. The attacker’s site runs a script that silently submits a transaction request (like changing your email or transferring funds) to your bank’s site.

4. Your browser sends the request along with your authentication cookies.

5. The bank processes the request, believing it came directly from you.



### Prevention Strategies
- Use anti-CSRF tokens in forms, which are verified server-side for each user session.

- Require secondary verification for sensitive actions (like re-entering passwords).

- Set SameSite cookies to restrict sending cookies on cross-origin requests.

- Implement proper user logout and session timeouts.


### Hacker can use these kind of things and trick us ?
```
<img src="https://bank.example.com/transfer?amount=1000&to=attacker" />
```


## Ways to prevent from CSRF

### 1. SameSite Cookie → Defends against CSRF
- CSRF works because the browser automatically attaches cookies across sites.

***If you mark your cookie as:***

```
Set-Cookie: sessionid=abc123; HttpOnly; Secure; SameSite=Strict
```

Then:
```
SameSite=Strict → Cookie is never sent on cross-origin requests.
```
```
SameSite=Lax → Cookie is sent on top-level navigation only (like clicking a link), not on hidden POST requests or forms.
```
```
SameSite=None; Secure → Cookie is always sent (but requires HTTPS).
```

👉 So SameSite stops CSRF because a malicious site (evil.com) cannot force your browser to attach your session cookie when sending requests to your site (bank.com).


### 2. CSP → Defends against XSS, clickjacking, data exfiltration
CSP doesn’t prevent CSRF directly, but it complements SameSite by:

Blocking malicious inline scripts ```(script-src 'self')``` → stops injected JS from stealing tokens.

Blocking ```<iframe>``` embedding ```(frame-ancestors 'none')``` → prevents clickjacking.

Restricting where requests (images, scripts, forms, etc.) can be sent → makes data exfil harder.

Example strong CSP:
```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self';
  style-src 'self';
  img-src 'self';
  font-src 'self';
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
```

### ✅ Together
- SameSite cookies → kill CSRF

- CSP headers → reduce XSS, clickjacking, and code injection.

- They solve different problems but work great as a defense-in-depth strategy.