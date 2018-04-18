// Shared parameters, filled each time we call the memoized function
const globals = {
  args: null,
  callback: null,
  result: null
}

const initGlobals = (callback, result) => {
  globals.callback = callback;
  globals.result = result;
}

export {
  globals,
  initGlobals
}
