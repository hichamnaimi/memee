# Memee

Javascript package for memoizing functions. Returning directly the result of function if it was called with the same arguments avoiding it's redundant work.

### Installing
Using npm:

```
$ npm i -g npm
$ npm i --save memee
```

**Using memee**
Always caching the function until we close the application.
```javascript
import memee from 'memee';

// A function that we want to memorize
const hello = () => {
    return 'Hello';
}

// Always will be memorized, cache will be empty once the application is closed
const memorizedHello = memee(hello);

memorizedHello(); // will performe and return 'hello'
memorizedHello(); // already cached, it will return directly the result 'hello'
````
***
**MAX AGE**
*{maxAge} option* will cache the function for a defined time, after that it will no longer exist in the cache (garbage collection purpose) . If it's called again, the function will perform and cache itself during the same duration of time.

```javascript
// Memorized for xxxx milliseconds
const memorizedHello = memee(hello, { maxAge: 3000 });

memorizedHello(); // will performe and return 'hello'
memorizedHello(); // already cached, it will return directly the result 'hello'

// After 3000milliseconds(3s)
memorizedHello(); // no longer cached, it will performe again and return 'hello'
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Hicham NAIMI**, for any suggestion you can contact me [HERE](mailto:hicham.naimi.hn@gmail.com)

## License

This project is licensed under the MIT License.
