import readInput from './fileReader';

/*
=================================================== 
|                  CityPlan                       |
===================================================
  The city plan consists of many streets and intersections. 
*/

class CityPlan {
  constructor(name) {
    this.name = name;
  }

  init(inputFile) {
    console.log(readInput(inputFile));
  }

  sayHi() {
    alert(this.name);
  }

}

export default CityPlan;
