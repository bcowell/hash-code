/*
=================================================== 
|                  Intersection                   |
===================================================
has a TrafficLightSchedule
has many incoming streets (at least 1)
has many outgoing streets (at least 1)
*/

class Intersection {
  constructor(id, incomingStreets, outgoingStreets) {
    this.id = id;
    this.incomingStreets = incomingStreets;
    this.outgoingStreets = outgoingStreets;
  }
}

export default Intersection;
