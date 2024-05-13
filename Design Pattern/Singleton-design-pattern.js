
/*
A Singleton only allows for a single instantiation, but many instances of the same object. The Singleton restricts clients from 
creating multiple objects, after the first object created, it will return instances of itself.


*/



class Singleton {
    static instance = null;
    constructor() {
        if (Singleton.instance !== null){
            console.log("Instance already been created!")
            return Singleton.instance;
        }
        this.name = ""
        Singleton.instance = this;
    }
    updateName(name) {
        this.name = name;
    }
    
    printName(){
        console.log("name: ", this.name)
    }
}

let a = new Singleton()
let b = new Singleton()

a.updateName("Ankit")
a.printName()
b.printName()
