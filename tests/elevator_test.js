require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Elevator = require('../elevator').default;

describe('Elevator', function() {
  let elevator = new Elevator();

  beforeEach(function() {
    elevator.reset();
  });

  it('should start at the lobby (floor 0) by default', () => {
    assert.equal(elevator.currentFloor, 0)
  });




  it('should bring a rider to a floor above their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 2, dropOffFloor: 5 };
    assert.deepEqual(elevator.requests, [])
    assert.deepEqual(elevator.passengers, [])

    elevator.goToFloor(mockUser);

    assert.equal(elevator.travelDirection, 'up');
    assert.equal(elevator.currentFloor, 5);
    assert.equal(elevator.floorsTraveled, 5);
    assert.equal(elevator.stopsMade, 1);
  });

  it('should bring a rider to a floor below their current floor', () => {
    let mockUser = { name: "Brittany", currentFloor: 8, dropOffFloor: 3 };
    assert.deepEqual(elevator.requests, [])
    assert.deepEqual(elevator.passengers, [])

    elevator.goToFloor(mockUser);

    assert.equal(elevator.travelDirection, 'down');
    assert.equal(elevator.currentFloor, 3);
    assert.equal(elevator.floorsTraveled, 13);
    assert.equal(elevator.stopsMade, 1);
  });

  it('should bring multiple riders to their respective floors', () => {
    let mockUserA = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };
    let mockUserB = { name: "Sue", currentFloor: 6, dropOffFloor: 2 };

    elevator.goToFloor(mockUserA);
    assert.equal(elevator.travelDirection, 'up');
    assert.equal(elevator.floorsTraveled, 9);
    assert.equal(elevator.stopsMade, 1);
    assert.equal(elevator.currentFloor, 9);


    elevator.goToFloor(mockUserB);
    assert.equal(elevator.travelDirection, 'down');
    assert.equal(elevator.stopsMade, 2);
    assert.equal(elevator.floorsTraveled, 16);
    assert.equal(elevator.currentFloor, 2);
  });


  it('should bring both passengers A and B up to their floors', () => {
    let mockUserA = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };
    let mockUserB = { name: "Sue", currentFloor: 6, dropOffFloor: 11 };

    elevator.goToFloor(mockUserA);
    assert.equal(elevator.stopsMade, 1);
    assert.equal(elevator.floorsTraveled, 9);
    assert.equal(elevator.travelDirection, 'up');


    elevator.goToFloor(mockUserB);
    assert.equal(elevator.stopsMade, 2);
    assert.equal(elevator.floorsTraveled, 17);
    assert.equal(elevator.travelDirection, 'up');
  });
  it('should bring passenger A up to their floor, and passenger B down to theirs', () => {
    let mockUserA = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };
    let mockUserB = { name: "Sue", currentFloor: 12, dropOffFloor: 4 };

    elevator.goToFloor(mockUserA);
    assert.equal(elevator.stopsMade, 1);
    assert.equal(elevator.floorsTraveled, 9);
    assert.equal(elevator.travelDirection, 'up');


    elevator.goToFloor(mockUserB);
    assert.equal(elevator.stopsMade, 2);
    assert.equal(elevator.floorsTraveled, 20);
    assert.equal(elevator.travelDirection, 'down');
  });
  it('should bring passenger A down to their floor, and passenger B up to theirs', () => {
    let mockUserA = { name: "Sue", currentFloor: 12, dropOffFloor: 4 };
    let mockUserB = { name: "Bob", currentFloor: 3, dropOffFloor: 9 };

    elevator.goToFloor(mockUserA);
    assert.equal(elevator.stopsMade, 1);
    assert.equal(elevator.floorsTraveled, 20);
    assert.equal(elevator.travelDirection, 'down');


    elevator.goToFloor(mockUserB);
    assert.equal(elevator.stopsMade, 2);
    assert.equal(elevator.floorsTraveled, 27);
    assert.equal(elevator.travelDirection, 'up');
  });
  it('should bring both passengers A and B down to their floors', () => {
    let mockUserA = { name: "Bob", currentFloor: 10, dropOffFloor: 6 };
    let mockUserB = { name: "Sue", currentFloor: 5, dropOffFloor: 2 };

    elevator.goToFloor(mockUserA);
    assert.equal(elevator.passengers, 1)
    assert.equal(elevator.stopsMade, 1);
    assert.equal(elevator.floorsTraveled, 14);
    assert.equal(elevator.travelDirection, 'down');


    elevator.goToFloor(mockUserB);
    assert.equal(elevator.stopsMade, 2);
    assert.equal(elevator.floorsTraveled, 18);
    assert.equal(elevator.travelDirection, 'down');
  });


});
