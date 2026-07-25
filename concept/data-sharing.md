
## How do you share data between sibling components?
The preferred approach is to lift the shared state to the nearest common parent and pass it down via props. If the state is needed by many components, I'd use Context or a global state library like Redux or Zustand. For loosely coupled communication, such as microfrontends, I'd use Custom Events or an event bus. For communication across browser tabs, I'd use the BroadcastChannel API or, if necessary, the storage event on localStorage.



| Method                         | Best Use Case                                |
| ------------------------------ | -------------------------------------------- |
| Lift State Up                  | Siblings with the same parent                |
| Context API                    | Shared app-wide state                        |
| Redux/Zustand                  | Complex global state                         |
| Props                          | Parent → Child                               |
| CustomEvent                    | Decoupled components, microfrontends         |
| Event Bus (Pub/Sub)            | Large event-driven applications              |
| BroadcastChannel               | Communication across browser tabs            |
| localStorage + `storage` event | Sync data across browser tabs (not same tab) |
