class Part {
  constructor({ name, type, value }) {
    this.name = name;
    this.validTypes = [
      'shell',
      'hyperdrive',
      'computer',
      'life support',
      'landing gear',
    ];
    this.type = this.validTypes.includes(type) ? type : undefined;
    this.value = value;
    this.broken = false;
  }

  isValid() {
    return Boolean(this.name && this.type && this.value);
  }
}

module.exports = Part;
