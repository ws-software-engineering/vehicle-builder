// Importing Vehicle and Wheel classes
import Vehicle from "./Vehicle.js";
import Wheel from "./Wheel.js";
// Definition of the 'Motorbike' class extending the 'Vehicle' class
class Motorbike extends Vehicle {
    constructor(vin, color, make, model, year, weight, topSpeed, wheels) {
        super();
        this.vin = vin;
        this.color = color;
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.topSpeed = topSpeed;
        if (wheels.length !== 2) {
            this.wheels = [new Wheel(), new Wheel()];
        }
        else {
            this.wheels = wheels;
        }
    }
    wheelie() {
        console.log(`Motorbike ${this.make} ${this.model} is doing a wheelie!`);
    }
    // Overrides the 'printDetails' method from the 'Vehicle' class
    printDetails() {
        super.printDetails();
        console.log(`Vin: ${this.vin}`);
        console.log(`Make: ${this.make}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
        console.log(`Weight: ${this.weight}`);
        console.log(`Top Speed: ${this.topSpeed}`);
        console.log(`Color: ${this.color}`);
        console.log(`Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`);
        console.log(`Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`);
    }
}
// Export the Motorbike class as the default export
export default Motorbike;
