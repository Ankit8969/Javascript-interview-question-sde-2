/*

What is the Circuit Breaker Pattern?
In a distributed system, services often communicate with each other over a network. When a service calls another service, it may encounter failures due to various reasons, such as network issues, 
server downtime, or heavy load. If a service continues to make calls to a failing service, it can result in cascading failures, where more services are affected, and the overall system 
performance degrades.

The circuit breaker pattern addresses this problem by providing a mechanism to detect failures and stop making requests to the failing service for a certain period. 
This helps to prevent the system from being overwhelmed by repeated failures.

How Does It Work?
The circuit breaker can be in one of three states:

Closed: The service is operating normally. Requests are allowed to flow through.
Open: The service has encountered a failure. Requests are not allowed to flow through. Instead, an error is returned immediately.
Half-Open: After a timeout period, the circuit breaker allows a limited number of test requests to flow through to see if the service has recovered.
State Transitions
Closed to Open: When the number of failures exceeds a predefined threshold, the circuit breaker trips to the open state.
Open to Half-Open: After a timeout period, the circuit breaker transitions to the half-open state to test if the service has recovered.
Half-Open to Closed: If the test requests succeed, the circuit breaker resets to the closed state. If they fail, it goes back to the open state.

*/

class CircuitBreaker {
  constructor({ failureThreshold, recoveryTimeout }) {
    this.failureThreshold = failureThreshold;
    this.recoveryTimeout = recoveryTimeout;
    this.failures = 0;
    this.state = 'CLOSED';
    this.nextAttempt = Date.now();
  }

  async call(action) {
    if (this.state === 'OPEN') {
      if (Date.now() > this.nextAttempt) {
        this.state = 'HALF-OPEN';
      } else {
        throw new Error('Circuit is open');
      }
    }

    try {
      const result = await action();
      this.reset();
      return result;
    } catch (error) {
      this.fail();
      throw error;
    }
  }

  reset() {
    this.failures = 0;
    this.state = 'CLOSED';
  }

  fail() {
    this.failures += 1;
    if (this.failures >= this.failureThreshold) {
      this.state = 'OPEN';
      this.nextAttempt = Date.now() + this.recoveryTimeout;
    }
  }
}

// Usage
const breaker = new CircuitBreaker({ failureThreshold: 3, recoveryTimeout: 5000 });

async function makeRequest() {
  // Simulate a request that may fail
  if (Math.random() < 0.7) {
    throw new Error('Request failed');
  }
  return 'Success';
}

async function main() {
  for (let i = 0; i < 10; i++) {
    try {
      const result = await breaker.call(makeRequest);
      console.log(result);
    } catch (error) {
      console.log(error.message);
    }
  }
}

main();
