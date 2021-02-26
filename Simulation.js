import _ from 'lodash';
/*
    CONFIG
    {
        simulationDuration  : int,
        numIntersections    : int,
        bonusPointersPerCar : int,
        streets             : Array<Street>,
        cars                : Array<Car>,
        intersections       : Array<Intersection>
    }

    Street
    {
        name              : string,
        startIntersection : Intersection,
        endIntersection   : Intersection,
        travelTime        : integer,
        trafficLight      : TrafficLight
    }

    Car
    {
        path          : Array<Street>,
        currentStreet : Street,
        isStopped     : boolean
    }
    
    Intersection
    {
        id              : integer,
        incomingStreets : Array<Street>,
        outgoingStreets : Array<Street>
    }
*/

// {
//   "simulationDuration":6,
//   "numIntersections":4,
//   "bonusPointsPerCar":1000,
//   "streets":[
//     { "name": "rue-de-londres",  "startIntersection":2, "endIntersection":0, "travelTime":1, "trafficState":"RED" },
//     { "name": "rue-d-amsterdam", "startIntersection":0, "endIntersection":1, "travelTime":1, "trafficState":"RED" },
//     { "name": "rue-d-athenes",   "startIntersection":3, "endIntersection":1, "travelTime":1, "trafficState":"RED" },
//     { "name": "rue-de-rome",     "startIntersection":2, "endIntersection":3, "travelTime":2, "trafficState":"RED" },
//     { "name": "rue-de-moscou",   "startIntersection":1, "endIntersection":2, "travelTime":3, "trafficState":"RED" }
//   ],
//   "cars":[
//     {
//       "path": ["rue-de-londres", "rue-d-amsterdam", "rue-de-moscou", "rue-de-rome"],
//       "currentStreet": "rue-de-londres",
//       "isStopped": true
//     },
//     {
//       "path": [ "rue-d-athenes", "rue-de-moscou", "rue-de-londres" ],
//       "currentStreet": "rue-d-athenes",
//       "isStopped":true
//     }
//   ]
// }

const INTERVAL_IN_MS = 1000;

class Simulation {
  constructor(config) {
    // Assign a name so we can rank different simulations
    this.name = 'simA';
    this.score = 0;

    const { 
      simulationDuration, 
      numIntersections, 
      bonusPointsPerCar, 
      streets, 
      cars, 
      intersections, 
    } = config;

    this.simulationDuration = simulationDuration;
    this.numIntersections = numIntersections;
    this.bonusPointsPerCar = bonusPointsPerCar;

    this.streets = streets;
    this.cars = cars;
    this.intersections = intersections;
  }

  save() {
    // save score and solution to txt
    // solution is a combination of different traffic light schedules
  }

  turnOnOneRandomLight() {
    // turn on one red light
    // random intersection has at least one traffic light
    // turn random trafficlight green
    const randomIntersection = _.sample(this.intersections);
    const randomOutgoingStreet = _.sample(randomIntersection.outgoingStreets);

    randomOutgoingStreet.trafficLight.turnGreen();

    console.log(`Turned ${randomOutgoingStreet.name}'s light GREEN`);
  }

  turnLightForStreetName(streetName) {
    const street = this.streets.find(s => s.name === streetName);
    street.trafficLight.turnGreen();

    console.log(`Turned ${street.name}'s light GREEN`);
  }

  tick() {
    console.log('tick')
   
    // advance each car's position
    this.cars.forEach(car => {
      car.print();
      if (!car.isStopped) {
        car.drive();
      }
    })

    this.streets.forEach(street => {
      const trafficLight = street.trafficLight;
      if (trafficLight.isGreen() && trafficLight.queue.length) {
        let car = trafficLight.dequeueCar();
        car.moveToNextStreet();
      }
    })
  }

  run() {
    // this.turnOnOneRandomLight();
    this.turnLightForStreetName("rue-d-athenes");

    // Cars start out at the end of the first street in their path
    this.cars.forEach(car => {
      car.currentStreet.trafficLight.enqueueCar(car);
    })

    const cityLoop = setInterval(() => {
      this.tick();
    }, INTERVAL_IN_MS);
    
    setTimeout(() => {
      clearInterval(cityLoop);
    }, this.simulationDuration * 1000);
  }

  calcTotalPoints() {
    let totalPoints = 0;
    this.cars.forEach(car => {
      totalPoints += car.points;
    });

    return totalPoints;
  }
}

export default Simulation;
