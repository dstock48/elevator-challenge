require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert;
const Person = require('../person').default;

describe('Person', function() {
  let passenger = new Person('David', 4, 8)

  beforeEach(function() {

  });

  it('passenger should have a name', () => {
    assert.equal(passenger.name, 'David');
  });

  it('passenger should have a current floor', () => {
    assert.equal(passenger.currentFloor, 4);
  });

  it('passenger should have a drop-off floor', () => {
    assert.equal(passenger.dropOffFloor, 8);
  });


});
