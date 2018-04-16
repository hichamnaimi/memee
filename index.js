const globals = {
  args: null,
  callback: null,
  memoize: {
    cache: {},
    queueOfCleaners: [],
    callbackName: null,
    validMaxAge: null
  },
  debounce: {
    isDebounced : false
  }
}

const initGlobals = (callback) => {
  globals.callback = callback;
}

const initMemoize = (maxAge) => {
  const { callback, memoize } = globals;
  memoize.callbackName = callback.name;
  memoize.validMaxAge = isNaN(parseInt(maxAge, 10)) ? 0 : maxAge;
}

const initDebounce = () => {

}

// (IEF) memoization functionalities
const memoize = (() => {

  const _clearCache = () => {
    let { cache, queueOfCleaners } = globals.memoize;
    const concernedTimeout = queueOfCleaners.splice(0, 1)[0].value;
    console.log('deleting cache');
    delete cache[concernedTimeout];
    console.log('cache content: ', cache);
  }

  const _queueCleaners = () => {
    const { args } = globals;
    const { validMaxAge, callbackName, queueOfCleaners } = globals.memoize;
    queueOfCleaners.push({ time: validMaxAge, value: `${callbackName+args}` });
    queueOfCleaners.sort((a, b) => a.time > b.time ? 1 : -1);
  }

  const _memorize = () => {
    const { callback, args } = globals;
    const { callbackName, validMaxAge, cache } = globals.memoize;
    const callbackResult = callback.apply(this, [...args]);
    cache[`${callbackName+args}`] = callbackResult ? callbackResult : true;
    _queueCleaners();
    if (validMaxAge) setTimeout(_clearCache, validMaxAge);
  }

  // entry point
  const applyMemoization = () => {
    let { args } = globals;
    let { callbackName, cache } = globals.memoize;
    if (!cache[`${callbackName+args}`]) {
    	console.log('not cached');
      _memorize();
    }
    return cache[`${callbackName+args}`];
  }

  // exposing functionalities
  return {
    applyMemoization
  }
})(this);



module.exports = (callback, { maxAge = 0, debounced= false } = 0) => {
  // init globals
  initGlobals(callback);
  initMemoize(maxAge);

  return (...args) => {
    globals.args = args.length ? args : 'none';
    // applying memoization
    memoize.applyMemoization();
  };
}
