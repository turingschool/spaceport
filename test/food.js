var assert = require('chai').assert;
var Food = require('../src/food');

describe('Food', function() {
  it('has a quantity of 10 by default', function() {
    var gruel = new Food()

    assert.equal(gruel.quantity, 10) 
  });

  it('can have a different quantity', function() {
    var gruel = new Food(100)

    assert.equal(gruel.quantity, 100) 
  })

  it('can have a name', function() {
    var bananas = new Food(10, 'bananas')

    assert.equal(bananas.name, 'bananas') 
  })

  it('can have a different name', function() {
    var apples = new Food(10, 'apples')

    assert.equal(apples.name, 'apples') 
  })

  it('is gruel by default', function() {
    var gruel = new Food(10)

    assert.equal(gruel.name, 'gruel') 
  })

  it('can add more quantity', function() {
    var gruel = new Food(100)

    gruel.updateQuantity(15)

    assert.equal(gruel.quantity, 115) 
  })

  it('can reduce the quantity', function() {
    var gruel = new Food(100)

    gruel.updateQuantity(-13)

    assert.equal(gruel.quantity, 87) 
  })
})
