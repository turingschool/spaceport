const Being = require('../src/being');
const Part = require('../src/part');

class Ship {
  constructor({
    name,
    type,
    maxCrew,
    odometer = 0,
    fuelCapacity = 10,
    captain = null,
    parts = {},
  }) {
    this.name = name;
    this.validTypes = ['military', 'cargo', 'passenger'];
    this.type = this.validTypes.includes(type) ? type : undefined;
    this.maxCrew = maxCrew;
    this.odometer = odometer;
    this.fuelCapacity = fuelCapacity;
    this.fuel = 0;
    this.captain = captain;
    this.crew = [];
    this.cargo = [];
    this.parts = parts;
  }

  addCrew(members) {
    if (this.crew.length >= this.maxCrew) return;
    [...members].forEach(member => {
      if (member instanceof Being) this.crew.push(member);
    });
    this.crew.splice(this.maxCrew);
  }

  loadCargo(cargoItems) {
    if (cargoItems instanceof Part) this.cargo.push(cargoItems);
  }

  updatePart({ name, type, value, broken }) {
    if (type === undefined) return;

    if (this.parts[type]) {
      const diff = this.parts[type].value - value;
      this.parts[type] = { name, type, value, broken };
      return diff;
    }

    this.parts[type] = { name, type, value, broken };
  }

  checkReadiness() {
    const status = {};

    if (!this.captain) {
      status.notes = 'Cannot fly without a captain';
    } else if (!this.fuel) {
      status.notes = 'Cannot fly without fuel';
    } else if (!Object.keys(this.parts).length) {
      status.notes = 'Cannot fly without all parts';
    } else {
      status.notes = 'Good to go!';
    }

    status.readyToFly =
      Boolean(this.captain) &&
      this.fuel > 0 &&
      Object.keys(this.parts).length > 0;

    return status;
  }
}

module.exports = Ship;
