import { v4 as uuid } from 'uuid';
/*
=================================================== 
|                     Cars                        |
===================================================
- Each car is described by the path (a sequence of streets) it is going to drive
through
- Initially, all cars start at the end of the rst street in their path, waiting for the green
light (in case the traffic light is red), or ready to move (if it's green). If two cars start
at the end of the same street, the car listed first in the input file goes first.
- Cars are queued up at the end of each street. The first car in the queue can cross
the intersection immediately after the light turns green. There is no delay while a car
passes through an intersection. Cars after that cross the intersection one after
another, one car every second.
- When a car enters the last street of its path, it completes its drive until the end of
the street and then is immediately removed from it. This means that the car does
not queue up at the end of the last street of its path and does not enter the
intersection at the end of it.
*/

class Car {
  constructor(path, bonusPointsPerCar) {
    this.uuid = uuid().split('-')[0];
    this.path = path;
    this.points = 0;
    this.bonusPointsPerCar = bonusPointsPerCar;

    this.currentStreet = path[0];
    this.currentStreetIndex = path[0].travelTime;
    this.isStopped = true;
  }

  moveToNextStreet() {
    console.log(`${this.uuid} moveToNextStreet`)
    // remove current street from path
    this.path.shift();
    // move car to next street
    this.currentStreet = this.path[0];
    this.currentStreetIndex = 0;
    this.isStopped = false;
  }

  drive() {
    console.log(`${this.uuid} drive`);
    // advance 1 spot
    const totalLengthOfStreet = this.currentStreet.travelTime;
    
    if (this.currentStreetIndex === totalLengthOfStreet) {
      const canContinue = this.currentStreet.trafficLight.isGreen();
      if (canContinue) {
        moveToNextStreet();
      }
      else {
        this.isStopped = true;
        // this.currentStreet.trafficLight.enqueueCar(this);
      }
    }
    else {
      this.currentStreetIndex += 1;
    }

    if (this.carIsAtFinalDestination) {
      this.points = this.bonusPointsPerCar;
      console.log(`CAR ${this.uuid} IS OUTTA HERE`)
      return;
    }
  }

  carIsAtFinalDestination() {
    return this.path.length === 1;
  }

  print() {
    console.log(`Car ${this.uuid} is on ${this.currentStreet.name} isStopped: ${this.isStopped}`)
  }

}

export default Car;
