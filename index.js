import readFile from './fileReader';
import Simulation from './Simulation';

const inputFile = './input/a.txt';
const config = readFile(inputFile);

// console.log(config);

const simulation = new Simulation(config);
simulation.run();
// simulation.save();

// save score and solution to txt
// solution is a combination of different traffic light schedules