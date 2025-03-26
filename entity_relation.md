## Example
```
Input:
const arr = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];

console.log(ancestry(arr));

Output:
[
  "animal -> mammal -> cat -> lion",
  "animal -> mammal -> cat",
  "animal -> mammal -> dog",
  "animal -> mammal",
  "animal -> fish",
  "animal -> fish -> shark"
]
```


## Solution
```
function printWithSpace(level, key) {
  let str = " ".repeat(2 * level) + " " + key;
  console.log(str);
}

function dfs(key, adj, level = 0) {
  printWithSpace(level, key);
  if (!adj[key]) return;

  for (let child of adj[key]) {
    dfs(child, adj, level + 1);
  }
}

function ancestry(arr) {
  let adj = {};
  let childrenSet = new Set();

  // Step 1: Build adjacency list & track children
  for (let [child, parent] of arr) {
    if (!adj[parent]) adj[parent] = [];
    adj[parent].push(child);
    childrenSet.add(child);
  }
  // Step 3: Perform DFS from the root
  dfs("animal", adj);
}

const arr = [
  ["lion", "cat"],
  ["cat", "mammal"],
  ["dog", "mammal"],
  ["mammal", "animal"],
  ["fish", "animal"],
  ["shark", "fish"],
];

ancestry(arr);

/**
 *
 * animal
 *      mammal
 *          cat
 *              lion
 *          dog
 *      fish
 *          shark
 *
 */

```
