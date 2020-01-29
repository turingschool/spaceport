const { assert } = require('chai');
const Planet = require('../src/planet');
const Ship = require('../src/ship');
const Being = require('../src/being');
const Part = require('../src/part');
const Shop = require('../src/shop');

describe('Planet', function() {
  it('has a name', function() {
    const planet = new Planet({ name: 'D1' });

    assert.equal(planet.name, 'D1');
  });

  it('can have a different name', function() {
    const planet = new Planet({ name: 'F2' });

    assert.equal(planet.name, 'F2');
  });

  it('can have a shop', function() {
    const shop = new Shop({ name: 'EZ-mart' });
    const planet = new Planet({ name: 'F2', shop });

    assert.equal(planet.shop.name, 'EZ-mart');
  });

  it('can have a different shop', function() {
    const shop = new Shop({ name: 'Walmart' });
    const planet = new Planet({ name: 'F2', shop });

    assert.equal(planet.shop.name, 'Walmart');
  });

  it('can allow a ship to land', function() {
    const planet = new Planet({ name: 'F2' });
    const captain = new Being('Will', 'human');
    const parts = {
      shell: new Part({ name: 'S-1', type: 'shell', value: 200 }),
      hyperdrive: new Part({ name: 'R-100', type: 'hyperdrive', value: 20 }),
      computer: new Part({ name: '100X', type: 'computer', value: 300 }),
      lifeSupport: new Part({ name: 'B-98', type: 'lifeSupport', value: 100 }),
      landingGear: new Part({
        name: 'Legs-2',
        type: 'landingGear',
        value: 100,
      }),
    };
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
      parts,
    });

    planet.landShip(fighter);

    assert.deepEqual(planet.currentShip, fighter);
  });

  it('has coordinates', function() {
    const coordinates = { x: 0, y: 0, z: 0 };
    const planet = new Planet({ name: 'F2', coordinates });

    assert.deepEqual(planet.coordinates, coordinates);
  });

  it('can have different coordinates', function() {
    const coordinates = { x: 10, y: 10, z: 0 };
    const planet = new Planet({ name: 'F2', coordinates });

    assert.deepEqual(planet.coordinates, coordinates);
  });

  it('can calculate the distance between itself and another planet', function() {
    const initCoords = { x: 0, y: 0, z: 0 };
    const newCoords = { x: 10, y: 10, z: 10 };
    const planet = new Planet({ name: 'F2', coordinates: initCoords });
    const otherPlanet = new Planet({ name: 'Zorb', coordinates: newCoords });

    // HINT: https://www.varsitytutors.com/hotmath/hotmath_help/topics/distance-formula-in-3d
    assert.deepEqual(planet.calculateDistance(otherPlanet), Math.sqrt(300));
  });

  it('can calculate the distance between itself and different planet', function() {
    const initCoords = { x: 0, y: 0, z: 0 };
    const newCoords = { x: 5, y: 5, z: 5 };
    const planet = new Planet({ name: 'F2', coordinates: initCoords });
    const otherPlanet = new Planet({ name: 'Zorb', coordinates: newCoords });

    assert.deepEqual(planet.calculateDistance(otherPlanet), Math.sqrt(75));
  });

  it('can refuel a ship', function() {
    const planet = new Planet({ name: 'F2' });
    const captain = new Being('Will', 'human');
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
    });
    planet.currentShip = fighter;

    assert.equal(fighter.fuel, 0);
    planet.refuel(fighter);
    assert.equal(fighter.fuel, fighter.fuelCapacity);
  });

  it('cannot send a ship to another planet if the ship is missing parts', function() {
    const planet = new Planet({
      name: 'F2',
      coordinates: { x: 0, y: 0, z: 0 },
    });
    const otherPlanet = new Planet({
      name: 'M2',
      coordinates: { x: 1, y: 1, z: 1 },
    });
    const captain = new Being('Will', 'human');
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
    });
    fighter.fuel = 1;
    planet.currentShip = fighter;

    const result = planet.giveClearance(otherPlanet);

    assert.equal(result, 'Clearance denied: Cannot fly without all parts');
  });

  it('cannot send a ship if it is has no fuel', function() {
    const planet = new Planet({
      name: 'F2',
      coordinates: { x: 0, y: 0, z: 0 },
    });
    const otherPlanet = new Planet({
      name: 'M2',
      coordinates: { x: 1, y: 1, z: 1 },
    });
    const captain = new Being('Will', 'human');
    const parts = {
      shell: new Part({ name: 'S-1', type: 'shell', value: 200 }),
      hyperdrive: new Part({ name: 'R-100', type: 'hyperdrive', value: 20 }),
      computer: new Part({ name: '100X', type: 'computer', value: 300 }),
      lifeSupport: new Part({ name: 'B-98', type: 'lifeSupport', value: 100 }),
      landingGear: new Part({
        name: 'Legs-2',
        type: 'landingGear',
        value: 100,
      }),
    };
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
      parts,
    });
    planet.currentShip = fighter;

    const result = planet.giveClearance(otherPlanet);

    assert.equal(result, 'Clearance denied: Cannot fly without fuel');
  });

  it('cannot send a ship if it is has insufficient fuel', function() {
    const planet = new Planet({
      name: 'F2',
      coordinates: { x: 0, y: 0, z: 0 },
    });
    const otherPlanet = new Planet({
      name: 'M2',
      coordinates: { x: 1, y: 1, z: 1 },
    });
    const captain = new Being('Will', 'human');
    const parts = {
      shell: new Part({ name: 'S-1', type: 'shell', value: 200 }),
      hyperdrive: new Part({ name: 'R-100', type: 'hyperdrive', value: 20 }),
      computer: new Part({ name: '100X', type: 'computer', value: 300 }),
      lifeSupport: new Part({ name: 'B-98', type: 'lifeSupport', value: 100 }),
      landingGear: new Part({
        name: 'Legs-2',
        type: 'landingGear',
        value: 100,
      }),
    };
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
      parts,
    });
    fighter.fuel = 1;
    planet.currentShip = fighter;

    const fuelRequired = planet.calculateDistance(otherPlanet);
    const result = planet.giveClearance(otherPlanet);

    assert.equal(
      result,
      `Clearance denied: Need at least ${Math.ceil(
        fuelRequired
      )} units of fuel to reach ${otherPlanet.name}`
    );
  });

  it('can send a ship and update the ship & planets', function() {
    const planet = new Planet({
      name: 'F2',
      coordinates: { x: 0, y: 0, z: 0 },
    });
    const otherPlanet = new Planet({
      name: 'M2',
      coordinates: { x: 1, y: 1, z: 1 },
    });
    const captain = new Being('Will', 'human');
    const parts = {
      shell: new Part({ name: 'S-1', type: 'shell', value: 200 }),
      hyperdrive: new Part({ name: 'R-100', type: 'hyperdrive', value: 20 }),
      computer: new Part({ name: '100X', type: 'computer', value: 300 }),
      lifeSupport: new Part({ name: 'B-98', type: 'lifeSupport', value: 100 }),
      landingGear: new Part({
        name: 'Legs-2',
        type: 'landingGear',
        value: 100,
      }),
    };
    const fighter = new Ship({
      name: 'Atlantis',
      type: 'military',
      captain,
      maxCrew: 2,
      odometer: 3340,
      parts,
    });
    fighter.fuel = 2;
    planet.currentShip = fighter;

    const fuelRequired = planet.calculateDistance(otherPlanet);
    const result = planet.giveClearance(otherPlanet);

    assert.equal(fighter.fuel, 0);
    assert.equal(planet.currentShip, undefined);
    assert.equal(otherPlanet.currentShip, fighter);
    assert.equal(
      result,
      `Clearance granted: Enjoy your trip to ${otherPlanet.name}`
    );
  });
});
