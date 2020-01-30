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

  updatePart(part) {
    if (part.validTypes.includes(part.type)) {
      const existingPart = this.parts[part.type];
      const existingValue = existingPart ? existingPart.value : 0;
      const diff = existingValue - part.value;
      this.parts[part.type] = part;
      return diff;
    }
  }

  checkReadiness() {
    const status = {};
    const hasCaptain = !!this.captain;
    const hasFuel = !!this.fuel;
    const hasParts = !!Object.keys(this.parts).length;
    status.notes = 'Cannot fly';

    if (!hasCaptain) {
      status.notes = `${status.notes} without a captain`;
    } else if (!hasFuel) {
      status.notes = `${status.notes} without fuel`;
    } else if (!hasParts) {
      status.notes = `${status.notes} without all parts`;
    } else {
      status.notes = 'Good to go!';
    }

    status.readyToFly = hasCaptain && hasFuel && hasParts;

    return status;
  }
}

module.exports = Ship;
