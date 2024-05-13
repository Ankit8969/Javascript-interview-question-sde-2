/*
-------------------Theory---------------
There are many times when one part of the application changes, other parts needs to be updated.
Another prime example is the model-view-controller (MVC) architecture; The view updates when the model changes. 


*/


class Subject {
    constructor() {
        this.observerList = []
    }
    
    subscribe(observe){
        this.observerList.push(observe);
    }
    unSubscribe() {
        this.observerList.splice(this.observerList.length - 1, 1);
    }
    notify(observe) {
        observe.notify()
    }
    broadCast() {
        for (let i=0;i<this.observerList.length;i++){
            this.observerList[i].notify()
        }
    }
}

class Observer {
    notify() {
        console.log("I am notified")
    }
};

// observer design pattern, instance
let ODP = new Subject();

let a = new Observer()
let b = new Observer()
let c = new Observer()

ODP.subscribe(a);
ODP.subscribe(b);
ODP.subscribe(c);


ODP.broadCast()




