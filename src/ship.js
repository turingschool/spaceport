var Being = require('../src/being.js')
var Part = require('../src/part.js')
class Ship {
  constructor({
    name,
    type,
    maxCrew,
    odometer,
    fuelCapacity,
    captain,
    crew,
    cargo,
    parts,
    }) {
    this.name = name;
    this.validTypes = ['military', 'passenger', 'cargo']
    this.type = this.validTypes.includes(type) ? type : undefined;
    this.maxCrew = maxCrew;
    this.odometer = odometer || 0;
    this.fuelCapacity = fuelCapacity || 10;
    this.fuel = 0;
    this.captain = captain;
    this.crew = [];
    this.cargo = [];
    this.parts = parts || {};
  }
  addCrew(members) {
    for (var i = 0; i < members.length; i++) {
      if(members[i] instanceof Being) {
        this.crew.push(members[i])
      }
      if (this.crew.length >= this.maxCrew) {
        break
      }
    }
  }
  loadCargo(parts) {
      if(parts instanceof Part) {
        this.cargo.push(parts)
    }
  }
  updatePart(part) {
    if(part.type === undefined) {
      return
    }
    var partExists = this.parts[part.type]
    var partValue = partExists ? partExists.value : 0
    var diff = partValue - part.value;
    this.parts[part.type] = part;
    return diff
  }

    checkReadiness() {
      var status = {
        readyToFly: false,
        notes: ''
      }
      if(!this.captain) {
        status.notes = 'Cannot fly without a captain'
      } else if(!this.fuel) {
        status.notes = 'Cannot fly without fuel'
      } else if(!Object.keys(this.parts).length) {
        status.notes = 'Cannot fly without all parts'
      } else if(this.captain && this.fuel) {
        status.notes = 'Good to go!';
        status.readyToFly = true;
      }
      return status;
    }
  } //end class

module.exports = Ship;
