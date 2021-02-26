import TrafficLight from './TrafficLight';
/*
=================================================== 
|                     Street                      |
===================================================
has a TrafficLight at end of the street for outgoing intersection B
one-way direction i.e from intersection A -> to intersection B

Each street:
- is identied by a unique name,
- leads from one intersection to another,
- does not contain any intersections in between
- has a fixed amount of time L it takes a car to get from the beginning of the
street to the end. If it takes L seconds to drive through a street and a car
enters it at time T it will arrive at the end of the street precisely at T+L,
independently of how many cars are on the street.
*/

/*
name              : string
startIntersection : Intersection
endIntersection   : Intersection
travelTime        : integer
*/

// streets are one-way, there will always be exactly 1 start and 1 end intersection
// travelTime represented in seconds

class Street {
  constructor(name, startIntersection, endIntersection, travelTime) {
    this.name = name;
    this.startIntersection = startIntersection;
    this.endIntersection = endIntersection;
    this.travelTime = travelTime;

    this.trafficLight = new TrafficLight();
  }

  getStartIntersection() {
    return this.startIntersection;
  }

  getEndIntersection() {
    return this.endIntersection;
  }

  getName() {
    return this.name;
  }

  setStartIntersection(startIntersection) {
      this.startIntersection = startIntersection;
  }

  setEndIntersection(endIntersection) {
      this.endIntersection = endIntersection;
  }
}

export default Street;
