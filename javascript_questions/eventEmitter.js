
/*
Event Emitter

1. EventEmitter can emit (or trigger) events. When an event is emitted, any listeners (functions) that are subscribed to that event are called.

2. You can register listeners (callback functions) to be executed when a specific event is emitted.

3. An event can have multiple listeners.

4. EventEmitter also allows you to remove listeners from an event

*/


class EventEmitter {
  constructor(){
    this.emitter = {};
  }

  register(event, listeners){
    if (this.emitter.hasOwnProperty(event)){
      this.emitter[event].push(listeners);
    }else {
      this.emitter[event] = [listeners]
    }
  }
  unregister(event, listener){
    this.emitter[event] = this.emitter[event].filter((item) => item !== listener);
  }

  emit(event, ...args){
    this.emitter[event].forEach((listener) => {
      listener(...args);
    })
  }
}

const eventEmitter = new EventEmitter();

eventEmitter.register('joined', (...args)=>{
  console.log("New Member Joined", args);
})

eventEmitter.register('joined', (...args)=>{
  console.log("New Member 2 Joined", args);
})

eventEmitter.register('leaved', ()=>{
  console.log("Member leaved");
})

eventEmitter.register('calling', ()=>{
  console.log("Member calling");
})


eventEmitter.emit('joined', "Hey there")

eventEmitter.emit('calling')

