## Axios and Interceptor

### What is Axios?

Axios is a JavaScript HTTP client library used to send requests from browsers and Node.js applications. It is widely adopted in the JavaScript ecosystem because it provides a clean promise-based API, automatic JSON handling, request/response interception, and broad compatibility with modern web development workflows.

Axios simplifies HTTP communication between applications and servers. It supports common request methods such as GET, POST, PUT, PATCH, and DELETE, while also offering features like configurable headers, request timeouts, query parameter serialization, upload/download progress events (where supported), request cancellation, and automatic transformation of request and response data.


Example
```
import axios from "axios";

const response = await axios.get("/api/users");

console.log(response.data);
```

### What is an Axios interceptor?

An interceptor allows you to run some code before a request is sent or before a response reaches your application.

```
React Component
      ↓
Axios Request
      ↓
Request Interceptor
      ↓
Backend API
      ↓
Response Interceptor
      ↓
React Component
```

***There are two types:***

- Request interceptor
- Response interceptor


### Request interceptor
```
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

### Response interceptor
Response interceptors are commonly used for handling things like:

- 401 Unauthorized
- token expiration
- common error handling
- logging
- transforming responses


### A practical React example

```
import axios from "axios";

const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized");
      // logout user / redirect to login
    }

    return Promise.reject(error);
  }
);

export default api;
```


### Component
```
import api from "./api/axios";

async function getUsers() {
  const response = await api.get("/users");

  console.log(response.data);
}
```