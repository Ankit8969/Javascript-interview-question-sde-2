## Cors Error
- CORS stands for Cross-Origin Resource Sharing.
- It is a browser security feature that restricts web pages from making requests to a different domain (origin) than the one that served the web page.
- When a request is made from Origin A ```(e.g., https://app.com)``` to Origin B ```(e.g., https://api.example.com)```, the browser checks if Origin B allows requests from other origins.
- If the server does not explicitly allow requests from that origin, the browser blocks the request and shows a CORS error.


### Preflight Request
- For certain types of requests (like PUT, DELETE, or those with custom headers), the browser first sends a preflight request using the OPTIONS method to check if the actual request is safe to send.
- The server must respond with appropriate CORS headers, such as:

```
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: PUT
Access-Control-Allow-Headers: Content-Type
```

Only if the browser sees valid CORS headers in the response will it proceed with the actual request.

<img width="660" height="142" alt="image" src="https://github.com/user-attachments/assets/9091ab1a-cbaa-4db7-9ccf-297f3557ed2b" />
