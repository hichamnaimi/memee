// debounce functionalities
import { globals } from './globals.mjs'
import { memoize, getMemoizedResults } from './memoize.mjs'

const debounceParams = {
  isDebounced : false,
  timeout: null,
  wait: 0
}

const initDebounce = (isDebounced, wait) => {
  debounceParams.isDebounced = isDebounced;
  debounceParams.wait = wait;
}

const _laterCallback = () => {
  const { callback, args, result } = globals;
  memoize();
  result(getMemoizedResults());
}

// entry point
const debounce = () => {
  const { timeout, wait, isDebounced } = debounceParams;
  clearTimeout(timeout);
  debounceParams.timeout = setTimeout(_laterCallback, wait);
}

export {
  debounceParams,
  initDebounce,
  debounce
}
