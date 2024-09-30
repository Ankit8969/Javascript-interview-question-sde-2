

let obj = {
    name: "Ankit",
    age: 25,
    getDetails: function(){
        console.log(this.name + " " + this.age)
    }
}
let obj2 = {
    name:"Sonu",
    age: 27
}



Function.prototype.myCall = function(context={}, ...args) {
    if (typeof this !== 'function') {
        throw new Error(`${this} must be a function`);
        return ;
    }
    
    context.fun = this;
    context.fun(...args);
}

// obj.getDetails.myCall(obj);
// obj.getDetails.myCall(obj2);


Function.prototype.myApply = function(context={}, args = []) {
    if (typeof this !== 'function') {
        throw new Error(`${this} must be a function`);
        return ;
    }
    
    context.fun = this;
    context.fun(...args);
}


// obj.getDetails.myApply(obj);
// obj.getDetails.myApply(obj2);


Function.prototype.myBind = function(context={}, ...args){
    if (typeof this !== 'function') {
        throw new Error(`${this} must be a function`);
        return ;
    }
    
    context.fun = this;
    return function(...newArgs) {
        return context.fun(...args, ...newArgs);
    }
}

let temp = obj.getDetails.myBind(obj2);
temp();
temp.call(obj);




