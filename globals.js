// Shared parameters, filled each time we call the memoized function
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

module.exports = {
  globals,
  initGlobals
}
