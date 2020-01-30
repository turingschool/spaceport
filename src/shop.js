class Shop {
  constructor({ name }) {
    this.name = name;
    this.validParts = [
      "shell",
      "hyperdrive",
      "computer",
      "life support",
      "landing gear"
    ];
    this.inventory = {};
  }

  addInventory(item) {
    if (this.validParts.includes(item.type)) {
      this.inventory[item.type] = item;
    }
  }

  outfitShip(ship, part) {
    const hasCaptain = ship.captain;
    const partSelected = this.inventory[part].type === part;
    const credits = hasCaptain ? ship.captain.credits : 0;
    const notEnoughCredits = credits < this.inventory[part].value;

    if (!hasCaptain) {
      return "cannot outfit a ship without a captain";
    }
    if (partSelected && notEnoughCredits) {
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
