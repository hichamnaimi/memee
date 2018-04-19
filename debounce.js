// debounce functionalities
const { globals } = require('./globals.js');
const { memoize, getMemoizedResults} = require('./memoize.js');

const initDebounce = (isDebouncedArg, waitArg) => {
  const { isDebounced, wait } = globals.debounce;
  isDebounced = isDebouncedArg;
  waitArg = wait;
}

const _laterCallback = () => {
  memoize();
  result(getMemoizedResults());
}

const debounce = () => {
  const { timeout, wait, isDebounced } = globals.debounce;
  clearTimeout(timeout);
  debounceParams.timeout = setTimeout(_laterCallback, wait);
}

module.exports = {
  initDebounce,
  debounce
}
