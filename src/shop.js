class Shop {
  constructor({ name }) {
    this.name = name;
    this.validParts = [
      'shell',
      'hyperdrive',
      'computer',
      'life support',
      'landing gear',
    ];
    this.inventory = {};
  }

  addInventory(item) {
    if (this.validParts.includes(item.type)) {
      this.inventory[item.type] = item;
    }
  }

  outfitShip(ship, part) {
    if (!ship.captain) {
      return 'cannot outfit a ship without a captain';
    }

    if (
      this.inventory[part].type === part &&
      ship.captain.credits < this.inventory[part].value
    ) {
      return `you require ${Math.abs(
        ship.captain.credits - this.inventory[part].value
      )} more credits to make this purchase`;
    }

    ship.captain.credits -= this.inventory[part].value;
    ship.parts[part] = this.inventory[part];
    delete this.inventory[part];
    return `${part} added to ship`;
  }
}

module.exports = Shop;
