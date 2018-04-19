// Memoization functionalities
const { globals } = require('./globals.js')

const initMemoize = (maxAgeArg) => {
  const { callback } = globals;
  let { wait } = globals.debounce;
  let { callbackName, maxAge } = globals.memoize;
  callbackName = callback.name;
  // debounce resultCb get it's results from cache, if we destroy cache before debounce finish the result
  // will always remain undefined, thus maxAge should always be greater thant wait (debounce execution)
  wait = isNaN(parseInt(wait, 10)) ? 0 : wait;
  maxAge = isNaN(parseInt(maxAge, 10)) ? 0 : maxAgeArg;
  if (maxAge <= wait) maxAge = wait + 50;
}

const _clearCache = () => {
  const { cache, queueOfCleaners } = globals.memoize;
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

const memoize = () => {
  const { args } = globals;
  const { callbackName, cache } = globals.memoize;
  if (!cache[`${callbackName+args}`]) {
    _memorize();
  }
}

const getMemoizedResults = () => {
	const { args } = globals;
	const { cache, callbackName } = globals.memoize;
	return cache[`${callbackName+args}`];
}

module.exports = {
  initMemoize,
  memoize,
  getMemoizedResults
}
