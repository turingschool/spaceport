// Read the instructions for each of the warm up exercises carefully. This may
// seem repititious or pedandtic at first, however it's very important that you
// become comfortable with these fundamental concepts. Do not move on to
// iteration 1 until you are confident that you've completed all of iteration 0.

// ------------------------- Variables -------------------------//

// Initialize two new variables, "name", and "age", and assign values to them with
// your own name and age.

// var name = "Your name";
// var ...
const name = 'Chris';
let age = 36;

// Initialize a new variable "someThing", but leave it undefined

let sameThing;

// Initialize a new variable "isHuman", and assign it to a boolean value of your
// choice

const isHuman = true;

// Reassign (not initialize) your "age" variable from above. Use a built in math
// operator to make your age half of what it currently is.

age /= 2;

// Create a variable named "greeting", and assign it to a greeting of your
// choice. Your chosen greeting must make use of your "name" variable from above

const greeting = 'Hello';

// Create a new variable named "isMinor", and use a comparison operator to
// assign a boolean value to this variable. If "age" is less than 18, the
// variable should be true, otherwise it should be false. You MUST use a
// comparison operator.

const isMinor = age < 18;

// ------------------------- Conditionals -------------------------//

// Express the following in code: If the variable age is greater than 100 log
// the statement 'Oh! So old!', otherwise, log the statement 'Still a spring
// chicken!'

age > 100 ? console.log('Oh! So old!') : console.log('Still a spring chicken!');

// Express the following in code: If the length of the variable name is longer
// the 5 characters, log the statement 'Hi there [name]!'. Otherwise, log the
// statement 'Well hello [name]'. In either case, the value stored in the name
// variable should be included in the logged statement.

name.length > 5
  ? console.log(`Hi there ${name}`)
  : console.log(`Well hello ${name}`);

// ------------------------- Arrays -------------------------//

// Create a new variable "numbers" and assign it to an Array of 10 different
// numbers

const numbers = Array(10).fill(4);

// Write the code to access the 5th element of the Array, using bracket
// notation.

const fifth = numbers[4];

// Create a new variable "planets" and assign it to an Array the 8 planets in
// our solar system, represented by their names as Strings.

const planets = [
  'Mercury',
  'Venus',
  'Earth',
  'Mars',
  'Jupiter',
  'Saturn',
  'Uranus',
  'Neptune',
];

// Write the code to access the 7th planet from the sun, using bracket notation.

const seventh = planets[planets.length - 2];
