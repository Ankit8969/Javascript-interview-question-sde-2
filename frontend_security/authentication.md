# Ways to do Authentication

## Session-Based Authentication (Server-Side Sessions)

How it works:
- User logs in → Server verifies credentials.

- Server creates a session (a unique ID) and stores it in memory or a database.

- The session ID is sent back to the client as a cookie.

- On every subsequent request, the browser automatically sends the cookie.

- Server verifies the session ID and authenticates the user.


### Pros of Session-Based Auth:
| Advantage                           | Explanation                                     |
| ----------------------------------- | ----------------------------------------------- |
| **Simple & secure by default**      | Easy to implement, cookies are HTTPOnly/Secure. |
| **Can be invalidated anytime**      | Server can delete sessions (logout, timeout).   |
| **No token leakage in client-side** | Session ID is stored in HttpOnly cookie.        |


### Cons of Session-Based Auth:
| Disadvantage                                           | Explanation                                                                        |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **Scales poorly in distributed systems**               | Session data needs to be shared across servers (via sticky sessions or shared DB). |
| **Requires server-side storage**                       | Sessions need to be stored in memory or database.                                  |
| **CSRF vulnerabilities (if not configured correctly)** | Cookies are automatically sent with requests, which can be exploited.              |


JWT-Based Authentication (Token-Based, Stateless Auth)
---

***How it works:***
- User logs in → Server verifies credentials.

- Server generates a JWT (JSON Web Token) with user info (payload) and signs it.

- The JWT is sent to the client and stored (e.g., in localStorage or a cookie).

- On every request, the client sends the JWT in the Authorization header (Bearer token).

- Server verifies the token signature (does not need to store session).


### Difference b/w JWT and Session Based
| Aspect                 | Session-Based Auth                     | JWT-Based Auth                              |
| ---------------------- | -------------------------------------- | ------------------------------------------- |
| **Storage**            | Server (memory/DB)                     | Client (localStorage/cookie)                |
| **Scalability**        | Hard to scale (session sharing needed) | Scales well (stateless)                     |
| **Token invalidation** | Easy (just delete session on server)   | Hard (need blacklisting or wait for expiry) |
| **Size Overhead**      | Small (just a session ID)              | Larger (contains user data, signature)      |
| **Security**           | Cookies (HttpOnly) safer from XSS      | LocalStorage tokens vulnerable to XSS       |
| **CSRF Risk**          | Needs CSRF protection for cookies      | Safer if sent via Authorization header      |


## What is a Refresh Token?
A Refresh Token is a long-lived token used to obtain a new Access Token after the original Access Token expires without requiring the user to log in again.

| Token Type        | Lifetime                         | Purpose                                     |
| ----------------- | -------------------------------- | ------------------------------------------- |
| **Access Token**  | Short-lived (e.g., 15min - 1hr)  | Used for authenticating API requests        |
| **Refresh Token** | Long-lived (e.g., days or weeks) | Used to get a new Access Token after expiry |


### 🔄 Why Do We Need Refresh Tokens?
- Access Tokens should expire quickly to reduce risk if stolen.

- Asking the user to log in again after every expiry is a bad UX.

- Refresh Token allows the client to silently get a new Access Token when it expires.


### 🧑‍💻 Flow of Refresh Token Mechanism:
1. User Logs In → Server sends Access Token + Refresh Token.

2. Client stores Access Token (e.g., in memory) and Refresh Token (in HttpOnly cookie or secure storage).

On API calls:

3. If Access Token is valid → Proceed.

4. If Access Token expired → Client sends Refresh Token to get a new Access Token.

5. If Refresh Token is valid → Server issues a new Access Token.

6. If Refresh Token is invalid (e.g., blacklisted, expired) → Force re-login.


## OAuth 2.0 (Open Authorization 2.0) 
OAuth 2.0 (Open Authorization 2.0) is an authorization framework that allows applications to obtain limited access to a user’s resources on another service (like Google, Facebook, GitHub, etc.) without needing the user’s password.

### 🧑‍💻 Real-Life Example
- You log in to a website using "Login with Google".

- The website doesn’t see your Google password.

- You grant limited access (e.g., your email) to that website.

- OAuth 2.0 handles this secure delegation of access.

