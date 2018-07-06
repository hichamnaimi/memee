# Memee

Javascript package with **0 dependencies** for memoizing and debouncing functions. Returning directly the result of function if it was called with the same arguments avoiding it's redundant work.

### Installing
Using npm:

```
$ npm install memee
```

Using yarn:

```
$ yarn add memee
```

###Using memee

Import the package into the project
```javascript
const memee = require("memee");
```

Always caching the function until we close the application.
```javascript
let iterator = 0;
const increment = () => ++iterator;

const memoizedIncrement = memee(increment);

const firstCallResult = memoizedIncrement(); // 1
const secondCallResult = memoizedIncrement(); // 1
```

### Maximum age for memoization
*{maxAge} option* Define the duration of memoization.

```javascript
const increment = () => ++iterator;

const memoizedIncrement = memee(increment, { maxAge: 3000 });

const firstCallResult = memoizedIncrement(); // 1
const secondCallResult = memoizedIncrement(); // 1

// After 3seconds the cache is expired
const thirdCallResult = memoizedIncrement(); // 2
```

### Memoizing promises
memee can also memoize promises.
```javascript
let iterator = 0;

const incrementPromise = () => {
  ++iterator;
  return Promise.resolve(iterator);
}

const memoizedIncrementPromise = memee(incrementPromise);

// First call
memoizedIncrementPromise().then(resultA => {
  console.log(resultA); // 1

  // Second call
  memoizedIncrementPromise().then(resultB => {
    console.log(resultB); // 1
  });
});
```

### Define debounced function without memoization
Delay the execution of function for a giving time.
```javascript
let iterator = 0;
const increment = () => ++iterator;

// Callback holding increment result
const incrementResult = (result) => console.log(result); 

const delayedIncrement = memee(increment, {}, { debounced: true, wait: 2000, result: incrementResult });

// The callback is called with 2s delay: incrementResult(1)
delayedIncrement();
```

### Define debounced and memoized function
```javascript
let iterator = 0;
const increment = () => ++iterator;

// Callback holding increment result
const incrementResult = (result) => console.log(result); 

const memDelayedIncrement = memee(increment, { maxAge: 6000 },{ debounced: true, wait: 2000, result: incrementResult });

// The callback is called with 2s delay: incrementResult(1)
memDelayedIncrement();
// The callback is called with 2s delay: incrementResult(1)
memDelayedIncrement();

// After 6s the callback is called with 2s of delay: incrementResult(2)
setTimeout(memDelayedIncrement, 7000);
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Hicham NAIMI**, for any suggestion you can contact me [HERE](mailto:hicham.naimi.hn@gmail.com)

## License

This project is licensed under the MIT License.
