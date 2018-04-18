import { globals, initGlobals } from './globals.mjs'
import { initDebounce, debounce } from './debounce.mjs'
import { initMemoize, memoize, getMemoizedResults } from './memoize.mjs'

const memee = (callback, { maxAge = 0 } = {}, { debounced = false, wait = 0, result = () => {} } = {}) => {
  // init globals
  initGlobals(callback, result);
  if (debounced) initDebounce(debounced, wait);
  initMemoize(maxAge);

  return (...args) => {
    globals.args = args.length ? args : 'none';
    // if it's debounced we apply (debounce => memoize => result to debounce callback)
    if (debounced) return debounce();
    // else we only run memoization and get it's result directly
    memoize();
    return getMemoizedResults();
  };
}

export default memee;
