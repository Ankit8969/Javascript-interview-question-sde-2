## Circular dependency
With the help of linked list we can achieve circular dependency.

```

class LinkedList {
  constructor(val) {
    this.value = val;
    this.next = null;
  }
}

let list1 = new LinkedList(10);
let list2 = new LinkedList(20);
let list3 = new LinkedList(30);

list1.next = list2;
list2.next = list3;
list3.next = list1;

// removing the circularDependecy

function removingCircularDependency(head) {
  let uniquePath = new Set();
  let root = head;
  while(head) {
    if(!uniquePath.has(head)) {
      uniquePath.add(head);
    }else {
      head.next = null;
    }
    head = head.next;
  }
  return root;
}
list1 = removingCircularDependency(list1);


console.log(JSON.stringify(list1))




```
