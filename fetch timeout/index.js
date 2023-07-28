const url = "https://jsonplaceholder.typicode.com/comments";

const timeout = 100;

function fetchWithTimeout(url, options, timeout) {
  const fetchPromise = fetch(url, options);
  const timeoutPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Request timed out"));
    }, timeout);
  });
  console.log(Promise.race([fetchPromise, timeoutPromise]))
  return Promise.race([fetchPromise, timeoutPromise]);
}

fetchWithTimeout(
  url,
  {
    method: "GET"
  },
  timeout
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Getting Rejected ");
  });
