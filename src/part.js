class Part {
  constructor(model) {
    this.name = model.name;
    this.type = 
      model.type === 'shell' || 
      model.type === 'hyperdrive' || 
      model.type === 'computer' || 
      model.type === 'life support' || 
      model.type === 'landing gear' ? 
      model.type : undefined;
    this.value = model.value;
    this.broken = false;
  }
  isValid() {
  return Boolean(this.name && this.type && this.value)
}
  

}




module.exports = Part;


// isValid() {
//   return this.name === undefined || this.type === undefined || this.value === undefined ? false : true;

// }

// isValid() {
//   if (this.name === undefined || this.type === undefined || this.value === undefined) {
//     return false;
//   } else {
//     return true;
//   }
// }


// this.type = [
//   'shell', 
//   'hyperdrive', 
//   'computer', 
//   'life support', 
//   'landing gear'].includes(model.type) ? model.type : undefined;