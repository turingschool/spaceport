class Planet {
  constructor({ name, shop, coordinates }) {
    this.name = name;
    this.shop = shop;
    this.currentShip = null;
    this.coordinates = coordinates;
  }

  landShip(ship) {
    this.currentShip = ship;
  }

  calculateDistance(otherPlanet) {
    return Math.sqrt(
      Math.pow(otherPlanet.coordinates.x - this.coordinates.x, 2) +
        Math.pow(otherPlanet.coordinates.y - this.coordinates.y, 2) +
        Math.pow(otherPlanet.coordinates.z - this.coordinates.z, 2)
    );
  }

  refuel(ship) {
    ship.fuel = ship.fuelCapacity;
  }

  giveClearance(otherPlanet) {
    if (!Object.keys(this.currentShip.parts).length) {
      return 'Clearance denied: Cannot fly without all parts';
    }
    if (this.currentShip.fuel === 0) {
      return 'Clearance denied: Cannot fly without fuel';
    }
    if (this.currentShip.fuel < this.calculateDistance(otherPlanet)) {
      return `Clearance denied: Need at least ${Math.ceil(
        this.calculateDistance(otherPlanet)
      )} units of fuel to reach ${otherPlanet.name}`;
    }
    this.currentShip.fuel -= Math.ceil(this.calculateDistance(otherPlanet));
    otherPlanet.currentShip = this.currentShip;
    this.currentShip = undefined;
    return `Clearance granted: Enjoy your trip to ${otherPlanet.name}`;
  }
}

module.exports = Planet;
