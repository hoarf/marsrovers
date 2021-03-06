'use strict';

const screen = require('../lib/screen');

function Plateau(name, x, y) {
  this.name = name;
  this.x = x-1;
  this.y = y-1;


  this.roverPosition = [];

  if (global.visualMode) {
    screen.drawGrid(this.x, this.y);
  } else {
    console.log(' - CREATED NEW PLATEAU (%s by %s) FOR ROVERS!', x, y);
    console.log('');
  }

}


Plateau.prototype.dropRover = function (rover) {

  // TODO: show text on the side of the grid showing rover initial and final positions.

  this.roverPosition[rover.index] = [rover.x, rover.y];

  if (global.visualMode) {

    let roverName = 'Rover '+ (rover.index+1);
    let roverStartingPosition = rover.x +' '+ rover.y +' '+ rover.o;

    screen.filledBox(rover.x, rover.y, rover.o, rover.index, this.x, this.y);

    screen.write(1, rover.index, roverName);
    screen.write(2, rover.index, roverStartingPosition);

  } else {
    console.log(' - CREATED NEW ROVER #%s AT POSITION %s %s %s', rover.index, rover.x, rover.y, rover.o);
    console.log('');
  }

};


Plateau.prototype.updateRoverPosition = function (rover, txt) {

  // TODO: here i need to check if the position is occupied by another rover
  // check the roverPosition array for earlier rovers on position [rover.x, rover.y]
  // if there's a rover on the next position, try to calculate an alternative route.

  if (this.roverPosition[rover.index])
    if (global.visualMode)
      screen.emptyBox(this.roverPosition[rover.index][0], this.roverPosition[rover.index][1], this.x, this.y);

  this.roverPosition[rover.index] = [rover.x, rover.y];

  if (global.visualMode) {
    screen.filledBox(rover.x, rover.y, rover.o, rover.index, this.x, this.y);
  } else {
    // console.log(' - Rover #%s in now at: %s %s %s and trying to %s', rover.index, rover.x, rover.y, rover.o, txt)
  }


  this.outputRoverMovementInfo(rover, txt);

};


Plateau.prototype.outputRoverMovementInfo = function (rover, txt) {

  let roverCurrentPosition = rover.x +' '+ rover.y +' '+ rover.o;

  if (global.visualMode) {
    screen.write(3, rover.index, roverCurrentPosition);
    screen.write(4, rover.index, txt);
  }

};


module.exports = Plateau;