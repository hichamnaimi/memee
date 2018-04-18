// using std/esm for import/export support like in ES6 browser environement
require = require('esm')(module)
module.exports = require("./memee.mjs").default
