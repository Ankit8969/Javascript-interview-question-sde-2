What is XSS (Cross-Site Scripting)?
---

XSS is a security vulnerability where an attacker injects malicious scripts (JavaScript) into webpages viewed by other users.

```
Goal of the attacker: Steal cookies, session tokens, user credentials, or perform actions on behalf of the user.
```

### 🧨 Types of XSS Attacks:

| Type              | Description                                                                                                 |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| **Stored XSS**    | Malicious script is **persisted** on the server (e.g., in DB). Affects every user who views the page.       |
| **Reflected XSS** | Malicious script is reflected back in the HTTP response (usually via URL query params).                     |
| **DOM-based XSS** | The vulnerability is in client-side JavaScript, which dynamically updates the DOM without sanitizing input. |

### How to protect against XSS?

| Defense Layer                            | How It Helps                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------- |
| **Input Validation**                     | Reject inputs with invalid characters early (e.g., `<`, `>`).                       |
| **Output Encoding/Escaping**             | Encode special characters (`<`, `>`, `"`, `'`) before rendering in HTML/JS context. |
| **Content Security Policy (CSP)**        | Restricts which scripts can execute (blocks inline scripts by default).             |
| **Avoid `innerHTML` / `document.write`** | Prefer safer APIs like `textContent` to avoid script injection.                     |
| **Use Safe Templating Engines**          | Templating libraries/frameworks (React, Angular, etc.) auto-escape outputs.         |
| **HTTPOnly & Secure Cookies**            | Prevent cookies from being accessed by malicious scripts.                           |


### Note:
XSS Protection is about validating inputs, escaping outputs, and using CSP to restrict script execution. Frameworks help a lot, but you need to be careful with user-generated content.
