// Imports the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
// Definition of the 'Truck' class
class Truck extends Vehicle {
    constructor(vin, color, make, model, year, weight, topSpeed, wheels, towingCapacity) {
        super();
        this.vin = vin;
        this.color = color;
        this.make = make;
        this.model = model;
        this.year = year;
        this.weight = weight;
        this.topSpeed = topSpeed;
        this.wheels = wheels.length === 4 ? wheels : [
            new Wheel(),
            new Wheel(),
            new Wheel(),
            new Wheel()
        ];
        this.towingCapacity = towingCapacity;
    }
    // Implements the 'toe' method from the 'AbleToTow' interface
    tow(vehicle) {
        let loggedVehicle;
        if (vehicle) {
            loggedVehicle = `${vehicle.make} ${vehicle.model}`;
        }
        else {
            return;
        }
        if (vehicle.weight <= this.towingCapacity) {
            console.log(`The ${loggedVehicle} is currently being towed`);
        }
        else {
            console.log(`The ${loggedVehicle} is too heavy to be towed`);
        }
    }
    // Overrides the 'printDetails' method from the 'Vehicle' class
    printDetails() {
        super.printDetails();
        console.log(`Vin: ${this.vin}`);
        console.log(`Color: ${this.color}`);
        console.log(`Make: ${this.make}`);
        console.log(`Model: ${this.model}`);
        console.log(`Year: ${this.year}`);
        console.log(`Weight: ${this.weight}`);
        console.log(`Top Speed: ${this.topSpeed}`);
        console.log(`Towing Capacity ${this.towingCapacity}`);
        console.log(`Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`);
        console.log(`Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`);
        console.log(`Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`);
        console.log(`Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`);
    }
}
// Export the Truck class as the default export
export default Truck;
