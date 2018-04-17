# Memee

Javascript package for memoizing and debouncing functions. Returning directly the result of function if it was called with the same arguments avoiding it's redundant work.

### Installing
Using npm:

```
$ npm i -g npm
$ npm i --save memee
```

###Using memee

Always caching the function until we close the application.
```javascript
import memee from 'memee';

// A function that we want to memorize.
const hello = () => 'hello'; // ES6 arrow function.

// Always will be memorized, cache will be empty once the application is closed.
const memorizedHello = memee(hello);

// Will performe and return 'hello'.
memorizedHello();

// Already cached, it will return directly the result 'hello'.
memorizedHello();
````

### Memoizing promises
Memee can also cache promises.
```javascript
let iterator = 0;

// Promise we want to save in cache.
const helloPromise = () => {
	// we iterate for each promise work.
	++iterator;
	return Promise.resolve('hello ' + iterator);
}

// Caching the promise with memee.
const memorizedHello= memee(helloPromise);

// First call, perform work and cache.
memorizedHello().then(resultA => {
    console.log(resultA); // show hello 1.

    // Second same call, already cached, returns result directly.
    memorizedHello().then(resultB => {
        console.log(resultB); // show hello 1, as the promise function was cached.
    });
});
```
### Maximum age for cache
*{maxAge} option* will cache the function for a defined time, after that it will no longer exist in the cache (garbage collection purpose) . If it's called again, the function will perform and cache itself during the same duration of time.

```javascript
const hello = () => 'hello';  // ES6 arrow function.

// We cache hello function for xxxx milliseconds.
const memorizedHello = memee(hello, { maxAge: 3000 });

// Will performe and return 'hello'.
memorizedHello();

// Already cached, it will return directly the result 'hello'.
memorizedHello();

// After 3000milliseconds(3s)...
// No longer cached, it will performe again and return 'hello'.
memorizedHello();
```

### Define debounced cached function
Debounced functions let us await the execution of a function for a defined time. It's useful when we have for example an input text that fetch remote data each time the user press a letter. While fetching data each time, we may wait for a defined time while user will almost finish typing text to launch fetching. It let us run application smoothly without surcharge of unnecessary work.
```javascript
const hello = () => 'hello';

// Will recieve the returning result if the debounced function returns one.
const callback = (res) => console.log('debounce result : ', res);

// We declare hello function as cached debounced function.
const memorizedHello = memee(hello, { maxAge: 3000 },{ debounced: true, wait: 2000, result: callback });

// Will execute hello function after 2s and caching it for 3s getting the result of execution in callback function.
memorizedHello();

// We may also cache (all time) hello function with debouncing.
const memorizedHello = memee(hello, {}, { debounced: true, wait: 2000, result: callback });
```


## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Hicham NAIMI**, for any suggestion you can contact me [HERE](mailto:hicham.naimi.hn@gmail.com)

## License

This project is licensed under the MIT License.
