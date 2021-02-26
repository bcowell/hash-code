/*
=================================================== 
|              TrafficLight                       |
===================================================
trafficState      : enum<GREEN, RED>
belongs to street
has a queue

Each traffic light has two states: 
a green light indicates that the cars from that street can cross the intersection and head towards any other street, 
while a red light indicates that the cars from that street need to stop. 
At most one traffic light will be green at each intersection at any given time. 
While the light is green for an incoming street, only cars from this street will be allowed to enter the intersection 
(and move to any outcoming street), all other cars have to wait.

Queuing up
When the light at the end of a street is red, arriving cars queue up waiting for the
light to turn green. When the light is green, one car can cross the intersection
every second. This means that if a green light for a given street lasts for Ti seconds 
then only the first Ti cars from that street will continue their travel
Others will need to wait for the following green light.
*/

class TrafficLight {
  constructor() {
    this.trafficState = 'RED';
    this.queue = [];
  }

  isGreen() {
    return this.trafficState === "GREEN";
  }

  turnGreen() {
    this.trafficState = 'GREEN';
  }

  turnRed() {
    this.trafficState = 'RED';
  }

  enqueueCar(car) {
    this.queue.push(car);
  }

  dequeueCar() {
    return this.queue.shift();
  }

}

export default TrafficLight;

