class Part {
  constructor({ name, type, value }) {
    this.name = name;
    this.type = type;
    this.value = value;
    this.broken = false;
  }

  isValid() {
    return Boolean(this.name) && Boolean(this.type) && Boolean(this.value);
  }
}

module.exports = Part;
