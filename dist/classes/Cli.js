import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
// The class 'CLI' prompts the user and creates actions and data on the feedback
class Cli {
    constructor(vehicles) {
        this.exit = false;
        this.vehicles = vehicles;
    }
    // Generates a unique vin number for all vehicles stored
    static generateVin() {
        return (Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15));
    }
    // Allows the user to choose a vehicle in the terminal
    chooseVehicle() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "selectedVehicleVin",
                message: "Select a vehicle to perform an action on",
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle.vin,
                    };
                }),
            },
        ])
            .then((answers) => {
            this.selectedVehicleVin = answers.selectedVehicleVin;
            // Performs actions on the specified vehicle
            this.performActions();
        });
    }
    // Prompts the user to select a vehicle type
    createVehicle() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "vehicleType",
                message: "Select a vehicle type",
                choices: ["Car", "Truck", "Motorbike"],
            },
        ])
            .then((answers) => {
            if (answers.vehicleType === "Car") {
                this.createCar();
            }
            if (answers.vehicleType === "Truck") {
                this.createTruck();
            }
            if (answers.vehicleType === "Motorbike") {
                this.createMotorbike();
            }
        });
    }
    // Method the create a car based on the 'Car' class properties
    createCar() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "color",
                message: "Enter Color",
            },
            {
                type: "input",
                name: "make",
                message: "Enter Make",
            },
            {
                type: "input",
                name: "model",
                message: "Enter Model",
            },
            {
                type: "input",
                name: "year",
                message: "Enter Year",
            },
            {
                type: "input",
                name: "weight",
                message: "Enter Weight",
            },
            {
                type: "input",
                name: "topSpeed",
                message: "Enter Top Speed",
            },
        ])
            .then((answers) => {
            const car = new Car(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), []);
            this.vehicles.push(car);
            this.selectedVehicleVin = car.vin;
            this.performActions();
        });
    }
    // Creates a truck object
    createTruck() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "color",
                message: "Enter Color",
            },
            {
                type: "input",
                name: "make",
                message: "Enter Make",
            },
            {
                type: "input",
                name: "model",
                message: "Enter Model",
            },
            {
                type: "input",
                name: "year",
                message: "Enter Year",
            },
            {
                type: "input",
                name: "weight",
                message: "Enter Weight",
            },
            {
                type: "input",
                name: "topSpeed",
                message: "Enter Top Speed",
            },
            {
                type: "input",
                name: "towingCapacity",
                message: "Enter Towing Capacity",
            },
        ])
            .then((answers) => {
            const truck = new Truck(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [], parseInt(answers.towingCapacity));
            this.vehicles.push(truck);
            this.selectedVehicleVin = truck.vin;
            this.performActions();
        });
    }
    // Creates a motorbike object
    createMotorbike() {
        inquirer
            .prompt([
            {
                type: "input",
                name: "color",
                message: "Enter Color",
            },
            {
                type: "input",
                name: "make",
                message: "Enter Make",
            },
            {
                type: "input",
                name: "model",
                message: "Enter Model",
            },
            {
                type: "input",
                name: "year",
                message: "Enter Year",
            },
            {
                type: "input",
                name: "weight",
                message: "Enter Weight",
            },
            {
                type: "input",
                name: "topSpeed",
                message: "Enter Top Speed",
            },
            {
                type: "input",
                name: "frontWheelDiameter",
                message: "Enter Front Wheel Diameter",
            },
            {
                type: "input",
                name: "frontWheelBrand",
                message: "Enter Front Wheel Brand",
            },
            {
                type: "input",
                name: "rearWheelDiameter",
                message: "Enter Rear Wheel Diameter",
            },
            {
                type: "input",
                name: "rearWheelBrand",
                message: "Enter Rear Wheel Brand",
            },
        ])
            .then((answers) => {
            const bike = new Motorbike(Cli.generateVin(), answers.color, answers.make, answers.model, parseInt(answers.year), parseInt(answers.weight), parseInt(answers.topSpeed), [
                new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
                new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
            ]);
            this.vehicles.push(bike);
            this.selectedVehicleVin = bike.vin;
            this.performActions();
        });
    }
    // Method for finding a vehicle to tow
    findVehicleToTow(truck) {
        inquirer
            .prompt([
            {
                type: "list",
                name: "vehicleToTow",
                message: "Select a vehicle to tow",
                choices: this.vehicles.map((vehicle) => {
                    return {
                        name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
                        value: vehicle,
                    };
                }),
            },
        ])
            .then((answers) => {
            if (answers.vehicleToTow.constructor.name === "Truck") {
                console.log(`The truck cannot tow itself`);
                this.performActions();
            }
            else {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === truck.vin &&
                        this.vehicles[i].constructor.name === "Truck") {
                        const truck = this.vehicles[i];
                        truck.tow(answers.vehicleToTow);
                    }
                }
                this.performActions();
            }
        });
    }
    // Method for performing actions on a vehicle
    performActions() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "action",
                message: "Select an action",
                choices: [
                    "Print details",
                    "Start vehicle",
                    "Accelerate 5 MPH",
                    "Decelerate 5 MPH",
                    "Stop vehicle",
                    "Turn right",
                    "Turn left",
                    "Reverse",
                    "Select or create another vehicle",
                    "Tow vehicle",
                    "Wheelie",
                    "Exit",
                ],
            },
        ])
            .then((answers) => {
            if (answers.action === "Print details") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].printDetails();
                    }
                }
            }
            else if (answers.action === "Start vehicle") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].start();
                    }
                }
            }
            else if (answers.action === "Accelerate 5 MPH") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].accelerate(5);
                    }
                }
            }
            else if (answers.action === "Decelerate 5 MPH") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].decelerate(5);
                    }
                }
            }
            else if (answers.action === "Stop vehicle") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].stop();
                    }
                }
            }
            else if (answers.action === "Turn right") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].turn("right");
                    }
                }
            }
            else if (answers.action === "Turn left") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].turn("left");
                    }
                }
            }
            else if (answers.action === "Reverse") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin) {
                        this.vehicles[i].reverse();
                    }
                }
            }
            else if (answers.action === "Tow vehicle") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].constructor.name === "Truck") {
                        let truck = {
                            vin: this.vehicles[i].vin,
                            make: this.vehicles[i].make,
                            model: this.vehicles[i].model,
                        };
                        this.findVehicleToTow(truck);
                        return;
                    }
                }
            }
            else if (answers.action === "Wheelie") {
                for (let i = 0; i < this.vehicles.length; i++) {
                    if (this.vehicles[i].vin === this.selectedVehicleVin &&
                        this.vehicles[i].constructor.name === "Motorbike") {
                        const motorbike = new Motorbike(this.vehicles[i].vin, this.vehicles[i].color, this.vehicles[i].make, this.vehicles[i].model, this.vehicles[i].year, this.vehicles[i].weight, this.vehicles[i].topSpeed, this.vehicles[i].wheels);
                        motorbike.wheelie();
                    }
                }
            }
            else if (answers.action === "Select or create another vehicle") {
                // Start the cli to return to the initial prompt if the user wants to select or create another vehicle
                this.startCli();
                return;
            }
            else {
                // Exit the cli if the user selects exit
                this.exit = true;
            }
            if (!this.exit) {
                // if the user does not want to exit, perform actions on the selected vehicle
                this.performActions();
            }
        });
    }
    // Method to start the cli
    startCli() {
        inquirer
            .prompt([
            {
                type: "list",
                name: "CreateOrSelect",
                message: "Would you like to create a new vehicle or perform an action on an existing vehicle?",
                choices: ["Create a new vehicle", "Select an existing vehicle"],
            },
        ])
            .then((answers) => {
            // Checks if the user wants to create a new vehicle or select an existing vehicle
            if (answers.CreateOrSelect === "Create a new vehicle") {
                this.createVehicle();
            }
            else {
                this.chooseVehicle();
            }
        });
    }
}
// export the Cli class
export default Cli;
