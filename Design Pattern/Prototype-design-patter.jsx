
/*

Writing the code by using "prototype" keyword, we can consider this code 
as "Prototype design pattern".



*/


var TeslaModelS = function() {
    this.numWheels    = 4;
    this.manufacturer = 'Tesla';
    this.make         = 'Model S';
}

TeslaModelS.prototype.go = function() {
    // Rotate wheels
}

TeslaModelS.prototype.stop = function() {
    // Apply brake pads
}


