
/*
Three thing we can do in pubsub
subscribe
publish
un-subscribe
*/


class PubSub {
  constructor(){
    this.publisher = {};
  }
  subscribe(key, value){
    if (this.publisher.hasOwnProperty(key))
      this.publisher[key].push(value);
    else  
      this.publisher[key] = [value];
  }

  publish(key, payload) {
    if (this.publisher.hasOwnProperty(key)) {
      this.publisher[key].forEach((listener) => {
        listener(payload);
      })
    }
  }

  unsubscribe(key, method) {
    if (this.publisher.hasOwnProperty(key)) {
      this.publisher[key] = this.publisher[key].filter((item) => item != method)
    }
  }
}

const printMessage = (msg) =>{
  console.log("Listening on " + msg)
}

const printName = (msg) =>{
  console.log("Prining Name " + msg)
}
const pubsub = new PubSub();

pubsub.subscribe('message', printMessage);

pubsub.subscribe('message', printName);

pubsub.publish('message', "Ankit")
