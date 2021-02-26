/*
=================================================== 
|              TrafficLightSchedule               |
===================================================
one schedule per intersection
The traffic light schedule determines the order and duration of green light for the incoming streets of the
intersection and repeats itself until the end of the simulation. 

The schedule is a list of pairs: incoming street and duration. 
Each street can appear at most once in the schedule. 
The schedule can ignore some of the incoming streets – those will never get a green light.

The traffic light schedule is controlled by your submissions. You don't have to
specify the schedule of all traffic lights. 
By default all lights on all intersections are red 
(yes, cars stuck there will have to wait until the end of simulation).
*/

class TrafficLightSchedule {
  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

export default TrafficLightSchedule;
