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


### Practical use case
- We have to initiate the ***EventSource*** connection from client to server

### Client side code
```
function SSEExample() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:4000/events");
    
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setTime(data.time);
    };

    eventSource.onerror = (error) => {
      console.error("Error:", error);
    };

    // cleanup
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <h2>Server Time:</h2>
      <p>{time}</p>
    </div>
  );
}
```
### Server side code
```
app.get("/events", (req, res) => {
  // Required headers for SSE
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log("Client connected");

  // Send event every 2 seconds
  const intervalId = setInterval(() => {
    const data = {
      time: new Date().toLocaleTimeString(),
    };

    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 2000);

  // Handle client disconnect
  req.on("close", () => {
    console.log("Client disconnected");
    clearInterval(intervalId);
  });
});

```

### ***In case of SSE we have to send the above header mandatory***
- ```Content-Type: text/event-stream```
- ```Connection: keep-alive```

***We can only open 6 connection from chrome/safari/edge/firebox***
- This is the limitation from Browser not SSE
- Most browsers allow only 6 concurrent HTTP/1.1 connections per origin (domain).
- Since each SSE uses one long-lived HTTP connection, you can open only ~6 SSE connections per domain.


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

