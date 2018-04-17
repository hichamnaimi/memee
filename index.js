const globals = {
  args: null,
  callback: null,
  result: null,
  memoize: {
    cache: {},
    queueOfCleaners: [],
    callbackName: null,
    maxAge: null
  },
  debounce: {
    isDebounced : false,
    timeout: null,
    wait: 0
  }
}

const initGlobals = (callback, result) => {
  globals.callback = callback;
  globals.result = result;
}

const initMemoize = (maxAge) => {
  const { callback, memoize, debounce } = globals;
  const { wait } = globals.debounce;
  memoize.callbackName = callback.name;
  // debounce resultCb get it's results from cache, if we destroy cache before debounce finish the result
  // will always remain undefined, thus maxAge should always be greater thant wait (debounce execution)
  debounce.wait = isNaN(parseInt(wait, 10)) ? 0 : wait;
  memoize.maxAge = isNaN(parseInt(maxAge, 10)) ? 0 : maxAge;
  if (memoize.maxAge <= debounce.wait) memoize.maxAge = debounce.wait + 50;
}

const initDebounce = (isDebounced, wait) => {
  globals.debounce.isDebounced = isDebounced;
  globals.debounce.wait = wait;
}

// (IEF) memoization functionalities
const memoize = (() => {

  const _clearCache = () => {
    let { cache, queueOfCleaners } = globals.memoize;
    const concernedTimeout = queueOfCleaners.splice(0, 1)[0].value;
    delete cache[concernedTimeout];
  }

  const _queueCleaners = () => {
    const { args } = globals;
    const { maxAge, callbackName, queueOfCleaners } = globals.memoize;
    queueOfCleaners.push({ time: maxAge, value: `${callbackName+args}` });
    queueOfCleaners.sort((a, b) => a.time > b.time ? 1 : -1);
  }

  const _memorize = () => {
    const { callback, args, result } = globals;
    const { callbackName, maxAge, cache } = globals.memoize;
    const { isDebounced } = globals.debounce;
    const callbackResult = callback.apply(this, [...args]);
    cache[`${callbackName+args}`] = callbackResult ? callbackResult : true;
    if (maxAge) {
    	_queueCleaners();
    	setTimeout(_clearCache, maxAge);
    }
  }

  const applyMemoization = () => {
    let { args } = globals;
    let { callbackName, cache } = globals.memoize;
    if (!cache[`${callbackName+args}`]) {
      _memorize();
    }
  }

  const getResults = () => {
  	const { args } = globals;
  	const { cache, callbackName } = globals.memoize;
  	return cache[`${callbackName+args}`];
  }

  // exposing functionalities
  return {
    applyMemoization,
    getResults
  }
})(this);

// (IEF) debounce functionalities
const debounce = (() => {

  const _laterCallback = () => {
    const { callback, args, result } = globals;
    memoize.applyMemoization();
    result(memoize.getResults());
  }

  // entry point
  const applyDebounce = () => {
    const { timeout, wait, isDebounced } = globals.debounce;
    clearTimeout(timeout);
    globals.debounce.timeout = setTimeout(_laterCallback, wait);
  }

  return {
    applyDebounce
  }
})(this);

module.exports = (callback, { maxAge = 0 } = {}, { debounced = false, wait = 0, result = () => {} } = {}) => {
  // init globals
  initGlobals(callback, result);
  if (debounced) initDebounce(debounced, wait);
  initMemoize(maxAge);

  return (...args) => {
    globals.args = args.length ? args : 'none';
    // if it's debounced we apply (debounce => memoize => result to debounce callback)
    if (debounced) return debounce.applyDebounce();
    // else we only run memoization and get it's result directly
    memoize.applyMemoization();
    return memoize.getResults();
  };
}
