const validTypes = [
  'shell',
  'hyperdrive',
  'computer',
  'life support',
  'landing gear',
  undefined,
];

class Part {
  constructor({ name, type, value }) {
    this.name = name;
    this.type = validTypes.includes(type) ? type : undefined;
    this.value = value;
    this.broken = false;
  }

  isValid() {
    return Boolean(this.name) && Boolean(this.type) && Boolean(this.value);
  }
}

module.exports = Part;
