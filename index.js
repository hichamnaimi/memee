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
  const { callback } = globals;
  memoize.cache = {};
  memoize.queueOfCleaners = [];
  memoize.callbackName = callback.name;
  memoize.validMaxAge = isNaN(parseInt(maxAge, 10)) ? 0 : maxAge;
}

const initDebounce = () => {

}

// (IEF) memoization functionalities
const memoize = ((args) => {

  const _queueCleaners = () => {
    const { args } = globals;
    const { validMaxAge, callbackName } = globals.memoize;
    queueOfCleaners.push({ time: validMaxAge, value: `${callbackName+args}` });
    queueOfCleaners.sort((a, b) => a.time > b.time ? 1 : -1);
  }

  const _memorize = () => {
    const { callback, args } = globals;
    const { callbackName, validMaxAge } = globals.memoize;
    const callbackResult = callback.apply(this, [...args]);
    cache[`${callbackName+args}`] = callbackResult ? callbackResult : true;
    _queueCleaners();
    setTimeout(_clearCache, validMaxAge);
  }

  const _clearCache = () => {
    const { cache } = globals.memoize;
    const concernedTimeout = queueOfCleaners.splice(0, 1)[0].value;
    delete cache[concernedTimeout];
  }

  // entry point
  const applyMemoization = () => {
    let { args } = globals;
    let { callbackName, cache } = globals.memoize;
    if (!cache[`${callbackName+args}`]) {
      _memorize();
    }
    return cache[`${callbackName+args}`];
  }

  // exposing functionalities
  return {
    applyMemoization
  }
})(this);



module.exports = (callback, { maxAge = 0, debounced: false } = 0) => {
  // init globals
  initGlobals(callback);
  initMemoize(maxAge);

  return (...args) => {
    globals.args = args.length ? args : 'none';
    memorize.applyMemoization();
  };
}
