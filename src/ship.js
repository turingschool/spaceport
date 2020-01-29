const Being = require('../src/being');
const Part = require('../src/part');

class Ship {
  constructor({
    name,
    type,
    maxCrew,
    odometer = 0,
    fuelCapacity = 10,
    captain,
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
    if (part.type === undefined) return;
    if (this.parts[part.type]) {
      const diff = this.parts[part.type].value - part.value;
      this.parts[part.type] = part;
      return diff;
    }
    this.parts[part.type] = part;
  }

  checkReadiness() {
    const status = {};

    switch (true) {
      case !this.captain:
        status.notes = 'Cannot fly without a captain';
        break;
      case !this.fuel:
        status.notes = 'Cannot fly without fuel';
        break;
      case !Object.keys(this.parts).length:
        status.notes = 'Cannot fly without all parts';
        break;
      default:
        status.notes = 'Good to go!';
        break;
    }

    status.readyToFly =
      Boolean(this.captain) &&
      Boolean(this.fuel) &&
      Boolean(Object.keys(this.parts).length);

    return status;
  }
}

module.exports = Ship;
