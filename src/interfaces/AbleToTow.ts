// Importing the classes
import Truck from "../classes/Truck.js";
import Motorbike from "../classes/Motorbike.js";
import Car from "../classes/Car.js";

// Interface definition
interface AbleToTow {
    // Declare the properties
    towingCapacity: number;
    // Tow method takes a truck or a motorbike or a car as an argument
    tow(vehicle: Truck | Motorbike | Car): void;
}

// Exporting the interface
export default AbleToTow;
