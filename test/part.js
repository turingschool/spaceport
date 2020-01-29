const { assert } = require('chai');
const Part = require('../src/part');

describe('Part', function() {
  it('should have a name', function() {
    const fighterShell = new Part({ name: 'X1-shell' });

    assert.equal(fighterShell.name, 'X1-shell');
  });

  it('can have a different name', function() {
    const hyperdrive = new Part({ name: 'CV90-infinity' });

    assert.equal(hyperdrive.name, 'CV90-infinity');
  });

  it('has a type', function() {
    const hyperdrive = new Part({ name: 'CV90-infinity', type: 'hyperdrive' });

    assert.equal(hyperdrive.type, 'hyperdrive');
  });

  it('can have different types', function() {
    const fighterShell = new Part({ name: 'X1-shell', type: 'shell' });
    const hyperdrive = new Part({ name: 'CV90-infinity', type: 'hyperdrive' });
    const computer = new Part({ name: 'Alienware 550x', type: 'computer' });
    const support = new Part({
      name: 'Breatheright V10.0',
      type: 'lifeSupport',
    });
    const landing = new Part({ name: 'DryWet 98', type: 'landingGear' });

    assert.equal(fighterShell.type, 'shell');
    assert.equal(hyperdrive.type, 'hyperdrive');
    assert.equal(computer.type, 'computer');
    assert.equal(support.type, 'lifeSupport');
    assert.equal(landing.type, 'landingGear');
  });

  it.skip('must have a valid type', function() {
    const validTypes = [
      'shell',
      'hyperdrive',
      'computer',
      'life support',
      'landing gear',
      undefined,
    ];
    const computer = new Part({ name: 'Alienware 550x', type: 'computer' });
    const support = new Part({
      name: 'Breatheright V10.0',
      type: 'life support',
    });
    const landing = new Part({ name: 'DryWet 98', type: 'landing gear' });
    const spoon = new Part({ name: 'Silver Spoon', type: 'flatware' });
    const drill = new Part({ name: 'DeWalt 90Z', type: 'drill' });

    assert.include(validTypes, computer.type);
    assert.include(validTypes, support.type);
    assert.include(validTypes, landing.type);
    assert.include(validTypes, spoon.type);
    assert.include(validTypes, drill.type);
  });

  it('can have a value', function() {
    const computer = new Part({
      name: 'Alienware 550x',
      type: 'computer',
      value: 200,
    });

    assert.equal(computer.value, 200);
  });

  it('can have a different value', function() {
    const computer = new Part({
      name: 'Alienware 550x',
      type: 'computer',
      value: 300,
    });

    assert.equal(computer.value, 300);
  });

  it('is not broken by default', function() {
    const computer = new Part({
      name: 'Alienware 550x',
      type: 'computer',
      value: 300,
    });

    assert.equal(computer.broken, false);
  });

  it('is invalid without a name', function() {
    const computer = new Part({
      type: 'computer',
      value: 300,
    });

    assert.isFalse(computer.isValid());
  });

  it('is invalid without a type', function() {
    const computer = new Part({
      name: 'Alienware 550x',
      value: 300,
    });

    assert.isFalse(computer.isValid());
  });

  it('is invalid without a value', function() {
    const computer = new Part({
      name: 'Alienware 550x',
      type: 'computer',
    });

    assert.isFalse(computer.isValid());
  });

  it('is valid', function() {
    const computer = new Part({
      name: 'Alienware 550x',
      type: 'computer',
      value: 300,
    });

    assert.isTrue(computer.isValid());
  });
});
