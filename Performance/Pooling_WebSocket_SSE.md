# All these things we are using when we want real time updated in our app or service.
EG: 
- Messaging app
- Stock trading platform
- Notification service etc.



# 🔹 1. Polling

How it works: Client keeps sending requests every X seconds → “Do we have new posts?”

## ✅ Pros:

### Simple to implement.

- Works everywhere (no special browser support needed).

### ❌ Cons:

- High server load (lots of useless requests when there are no new posts).

- Latency depends on polling interval (if you poll every 30s, updates can be delayed).

- Not efficient at scale.

- 👉 Good for small apps / low traffic, but bad for large scale feeds.

## 🔹 2. SSE (Server-Sent Events)

- How it works: Client opens an EventSource connection; server pushes new posts as events.

### ✅ Pros:

- Very lightweight (just plain HTTP).

- One-way push from server → client fits perfectly for a news feed (you usually only need to receive updates).

- Automatic reconnection handled by the browser.

- Works great with load balancers (since it’s just HTTP).

### ❌ Cons:

- Unidirectional only (if you also want chat-like bidirectional comms, this won’t work).

- Limited support for binary data (mostly text).

- 👉 Best when you only need push updates from server (news feed is a great use case).

## 🔹 3. WebSockets

- How it works: Client opens a persistent TCP connection; both client and server can send messages anytime.

### ✅ Pros:

- Full-duplex (bi-directional).

- Very low latency (no need for polling).

- Can handle chat, collaborative apps, multiplayer games, etc.

### ❌ Cons:

- More complex to implement (need special server support, not just plain HTTP).

- Harder to scale behind load balancers/CDNs (sticky sessions often required).

- Slightly more overhead if you only need one-way communication.



## Why WebSockets are harder to scale behind load balancers ?

- WebSockets upgrade an HTTP request into a long-lived TCP connection (via the Upgrade: websocket header).

- Once established, that same TCP connection must stay alive for continuous communication.

- If the load balancer routes your packets to different backend servers midway, the connection will break because the state lives on the original server.

