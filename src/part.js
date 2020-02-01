
class Part {
  constructor({name, type, value}) {
    this.validTypes = [
      'shell',
      'hyperdrive',
      'computer',
      'life support',
      'landing gear',
       undefined]
    this.name = name;
    this.type = this.validTypes.includes(type) ? type : undefined;
    this.value = value;
    this.broken = false;
  }
  isValid() {
    return this.name && this.type && this.value !== undefined ? true : false;
  }
}

module.exports = Part;
