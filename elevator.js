export default class Elevator {
  constructor() {
    this.currentFloor = 0,
    this.requests = [],
    this.passengers = [],
    this.floorsTraveled = 0,
    this.stopsMade = 0,
    this.travelDirection = 'up'
  }

  reset() {
    this.currentFloor = 0
    this.requests = []
    this.passengers = []
    this.floorsTraveled = 0
    this.stopsMade = 0
  }

  goToFloor(passenger) {

    this.passengers.push(passenger)
    this.requests.push({currentFloor: passenger.currentFloor, dropOffFloor: passenger.dropOffFloor})

    if (passenger.currentFloor < passenger.dropOffFloor) {
      this.travelDirection = 'up'
    } else {
      this.travelDirection = 'down'
    }

    this.floorsTraveled += Math.abs(this.currentFloor - passenger.currentFloor) + Math.abs(passenger.dropOffFloor - passenger.currentFloor)

    this.currentFloor = passenger.dropOffFloor
    this.stopsMade += 1


    // how to remove passengers/requests from the elevator at the correct time?

    // this.passengers.forEach((passenger, i) => {
    //   if (passenger.dropOffFloor === this.currentFloor) {
    //     this.passengers.splice(i, i + 1)
    //   }
    // })

  }

}
