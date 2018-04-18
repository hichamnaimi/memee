// Memoization functionalities
import { globals } from './globals.mjs'
import { debounceParams } from './debounce.mjs';

const memoizeParams =  {
  cache: {},
  queueOfCleaners: [],
  callbackName: null,
  maxAge: null
};

const initMemoize = (maxAge) => {
  const { callback, debounce } = globals;
  let { wait } = debounceParams;
  memoizeParams.callbackName = callback.name;
  // debounce resultCb get it's results from cache, if we destroy cache before debounce finish the result
  // will always remain undefined, thus maxAge should always be greater thant wait (debounce execution)
  wait = isNaN(parseInt(wait, 10)) ? 0 : wait;
  memoizeParams.maxAge = isNaN(parseInt(maxAge, 10)) ? 0 : maxAge;
  if (memoizeParams.maxAge <= wait) memoizeParams.maxAge = wait + 50;
}

const _clearCache = () => {
  const { cache, queueOfCleaners } = memoizeParams;
  const concernedTimeout = queueOfCleaners.splice(0, 1)[0].value;
  delete cache[concernedTimeout];
}

const _queueCleaners = () => {
  const { args } = globals;
  const { maxAge, callbackName, queueOfCleaners } = memoizeParams;
  queueOfCleaners.push({ time: maxAge, value: `${callbackName+args}` });
  queueOfCleaners.sort((a, b) => a.time > b.time ? 1 : -1);
}

const _memorize = () => {
  const { callback, args, result } = globals;
  const { callbackName, maxAge, cache } = memoizeParams;
  const { isDebounced } = debounceParams;
  const callbackResult = callback.apply(this, [...args]);
  cache[`${callbackName+args}`] = callbackResult ? callbackResult : true;
  if (maxAge) {
  	_queueCleaners();
  	setTimeout(_clearCache, maxAge);
  }
}

const memoize = () => {
  const { args } = globals;
  const { callbackName, cache } = memoizeParams;
  if (!cache[`${callbackName+args}`]) {
    _memorize();
  }
}

const getMemoizedResults = () => {
	const { args } = globals;
	const { cache, callbackName } = memoizeParams;
	return cache[`${callbackName+args}`];
}

export {
  memoizeParams,
  initMemoize,
  memoize,
  getMemoizedResults
}
