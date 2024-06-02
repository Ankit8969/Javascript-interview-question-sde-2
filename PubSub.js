
class PubSub {
  constructor() {
    this.subscribers = [];// In this array we will store the function only
  }

  subscribe(subscriber) {
    if (typeof subscriber !== 'function')
      throw new Error('Subscriber should be function')
    // adding to the subscriber method
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    if (typeof subscriber !== 'function')
      throw new Error('Subscriber should be function')
    // filter out 
    this.subscribers = this.subscribers.filter((item) => item !== subscriber);
  }

  publish(payload) {
    this.subscribers.forEach(subscriber => subscriber(payload))
  }

}

let instance = new PubSub();
instance.subscribe((payload)=>{
  console.log("First: ", payload);
})

instance.subscribe((payload)=>{
  console.log("Second: ", payload);
})

instance.subscribe((payload)=>{
  console.log("Third: ", payload);
})

instance.publish('Ankit');
/*
First:  Ankit
Second: Ankit
Third: Ankit
*/

instance.unsubscribe(instance.subscribers[0])

instance.publish('Sonu')
/*
Second: Sonu
Third: Sonu
*/

