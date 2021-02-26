import Car from './models/Car';
import Street from './models/Street';
import Intersection from './models/Intersection';

const fs = require('fs');

const readInput = (filePath) => {
    // Read the data from the file and split into lines
    const data = fs.readFileSync(filePath, 'ascii');
    const lines = data.split('\n');

    // First line is simulation config
    let firstLine = lines.shift().split(' ').map(n => parseInt(n));
    if (firstLine.length !== 5) {
        throw new Error("ERROR: Config file line 1 is invalid");
    }

    // Begin to populate constants with our first line values
    const [ simulationDuration, numIntersections, numStreets, numCars, bonusPointsPerCar ] = firstLine;
    const config = {
        simulationDuration,
        numIntersections,
        bonusPointsPerCar,
        streets: [],
        cars: [],
        intersections: []
    };

    // Initialize streets
    for (let i=0; i<numStreets; i++) {
        const streetConfig = lines.shift().split(' ');
        const street = new Street(
            streetConfig[2],
            parseInt(streetConfig[0]),
            parseInt(streetConfig[1]),
            parseInt(streetConfig[3])
        );
        config.streets.push(street);
    }

    // Initialize intersections
    const intersectionIds = new Set();
    for (let i=0; i<config.streets.length; i++) {
        intersectionIds.add(config.streets[i].getStartIntersection());
        intersectionIds.add(config.streets[i].getEndIntersection());
    }
    const intersections = {};
    Array.from(intersectionIds).forEach(id => {
        let incomingStreets = [];
        let outgoingStreets = [];
        config.streets.forEach(street => {
            if (street.getEndIntersection() === id) {
                incomingStreets.push(street);
            } else if (street.getStartIntersection() === id) {
                outgoingStreets.push(street);
            }
        });
        intersections[id] = new Intersection(id, incomingStreets, outgoingStreets);
    });
    config.intersections.push(...Object.values(intersections));

    // Replace street intersection IDs with intersection class objects
    for (let i=0; i<config.streets.length; i++) {
        const street = config.streets[i];
        street.setStartIntersection(intersections[street.getStartIntersection()]);
        street.setEndIntersection(intersections[street.getEndIntersection()]);
    }
    
    // Initialize cars
    for (let i=0; i<numCars; i++) {
        const carConfig = lines.shift().split(' ');
        carConfig.shift();
        let path = carConfig.map(streetName => config.streets.find(street => street.name === streetName))
        const car = new Car(path, bonusPointsPerCar);
        config.cars.push(car);
    }

    return config;
};

export default readInput;
