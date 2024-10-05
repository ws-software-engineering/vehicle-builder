// Import classes
import Truck from "./classes/Truck.js";
import Car from "./classes/Car.js";
import Motorbike from "./classes/Motorbike.js";
import Wheel from "./classes/Wheel.js";
import Cli from "./classes/Cli.js";
// Array to store the default vehicles
const vehicles = [];
// New default 'Truck' object 
const truck1 = new Truck(Cli.generateVin(), "red", "Ford", "F-150", 2021, 5000, 120, [], 10000);
// New default 'Car' w/ default tires
const car1 = new Car(Cli.generateVin(), 'blue', 'Toyota', 'Camry', 2021, 3000, 130, []);
// Default motorbike object
const motorbike1Wheels = [new Wheel(17, "Michelin"), new Wheel(17, "Michelin")];
const motorbike1 = new Motorbike(Cli.generateVin(), "black", "Harley Davidson", "Sportster", 2021, 500, 125, motorbike1Wheels);
// Adding the default objects to application
vehicles.push(motorbike1);
vehicles.push(truck1);
vehicles.push(car1);
// Creates a new instance of the CLI class
const cli = new Cli(vehicles);
// Starts the CLI
cli.startCli();
