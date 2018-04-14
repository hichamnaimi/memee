# Memee

Javascript package for memoizing functions. Returning directly the result of function if it was called with the same arguments avoiding it's redundant work.

### Installing
Using npm:

```
$ npm i -g npm
$ npm i --save memee
```

Using memee

```javascript
import memee from 'memee';

// A function that we want to memorize
const hello = () => {
    return 'Hello';
}

// Always will be memorized
const memorizedHello = memee(hello);

memorizedHello(); // will performe and return 'hello'
memorizedHello(); // already cached, it will return directly the result 'hello


// Memorized for xxxx milliseconds
// Maybe used to uncache the function after xxxx milliseconds (garbage collecting purpose)
const memorizedHello = memee(hello, { maxAge: 3000 });

memorizedHello(); // will performe and return 'hello'
memorizedHello(); // already cached, it will return directly the result 'hello

// After 3000milliseconds(3s)
memorizedHello(); // no longer cached, it will performe again and return 'hello'
```

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Hicham NAIMI**
For any suggestion you can contact me [HERE](mailto:hicham.naimi.hn@gmail.com)

## License

This project is licensed under the MIT License.
