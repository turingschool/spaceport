class Being {
  constructor(name, species) {
    this.isAlive = true;
    this.name = name;
    this.species = species;
    this.credits = 0;
  }
  updateCredits(currentCredit) {
   this.credits = currentCredit += this.credits;
    
  }
 
}

module.exports = Being;
