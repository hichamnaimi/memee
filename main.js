// using std/esm for import/export support like in ES6 browser environement
const memee = require('./memee.js');

let iterator = 0;

const hello = () => {
  ++iterator;
  console.log(iterator);
}

const memoizedHello = memee(hello);

memoizedHello();
memoizedHello('d');
