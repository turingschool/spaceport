const { assert } = require('chai');
const Shop = require('../src/shop');
const Part = require('../src/part');
const Being = require('../src/being');
const Ship = require('../src/ship');

describe('Shop', function() {
  it('has a name', function() {
    const newShop = new Shop({ name: 'EZ-way' });

    assert.equal(newShop.name, 'EZ-way');
  });

  it('can have a different name', function() {
    const newShop = new Shop({ name: 'Conogo' });

    assert.equal(newShop.name, 'Conogo');
  });

  it('has no inventory by default', function() {
    const newShop = new Shop({ name: 'Conogo' });

    assert.deepEqual(newShop.inventory, {});
  });

  it('can add a piece of inventory', function() {
    const computer = new Part({ name: 'comp', type: 'computer', value: 200 });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(computer);

    assert.include(Object.values(newShop.inventory), computer);
  });

  it('can add another piece of inventory', function() {
    const hyperdrive = new Part({ name: 'Z1', type: 'hyperdrive', value: 200 });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(hyperdrive);

    assert.include(Object.values(newShop.inventory), hyperdrive);
  });

  it('can add multiple pieces of inventory', function() {
    const computer = new Part({ name: 'comp', type: 'computer', value: 200 });
    const hyperdrive = new Part({
      name: 'hyperdrive',
      type: 'hyperdrive',
      value: 200,
    });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(computer);
    newShop.addInventory(hyperdrive);

    // remember, if what you're looking at is unfamiliar, look up
    // some documentation!
    assert.include(Object.values(newShop.inventory), computer);
    assert.include(Object.values(newShop.inventory), hyperdrive);
  });

  it('can only add parts and food to the inventory', function() {
    const thing = { name: 'something', type: 'anything' };
    const otherThing = { name: 'else', quantity: 100 };
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(thing);
    newShop.addInventory(otherThing);

    assert.deepEqual(newShop.inventory, {});
  });

  it('cannot outfit a ship without a captain', function() {
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      maxCrew: 2,
      odometer: 3340,
    });
    const shell = new Part({ name: 'S-1', type: 'shell', value: 200 });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(shell);
    const result = newShop.outfitShip(fighter, 'shell');

    assert.equal(result, `cannot outfit a ship without a captain`);
  });

  it('cannot outfit a ship if the captain is broke', function() {
    const captain = new Being('Will', 'human');

    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
    });
    const shell = new Part({ name: 'S-1', type: 'shell', value: 200 });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(shell);
    const result = newShop.outfitShip(fighter, 'shell');

    assert.equal(result, 'you require 200 more credits to make this purchase');
  });

  it('cannot outfit a ship if the captain is short funds', function() {
    const captain = new Being('Will', 'human');
    captain.credits = 100;

    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
    });
    const shell = new Part({ name: 'S-1', type: 'shell', value: 200 });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(shell);
    const result = newShop.outfitShip(fighter, 'shell');

    assert.equal(result, 'you require 100 more credits to make this purchase');
  });

  it('can outfit a ship, and charge the captain', function() {
    const captain = new Being('Will', 'human');
    captain.credits = 1000;

    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
    });
    const shell = new Part({ name: 'S-1', type: 'shell', value: 200 });
    const newShop = new Shop({ name: 'Conogo' });

    newShop.addInventory(shell);
    const result = newShop.outfitShip(fighter, 'shell');

    assert.equal(captain.credits, 800);
    assert.equal(fighter.parts.shell, shell);
    assert.isUndefined(newShop.inventory.shell);
    assert.equal(result, `shell added to ship`);
  });
});
