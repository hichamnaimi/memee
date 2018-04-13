module.exports = (callback, {maxAge} = 0) => {
  let cache = {};
  const queueOfCleaners = [];
  let timeout = null;
  const name = callback.name;
  let args = null;
  const validMaxAge = isNaN(parseInt(maxAge, 10)) ? 0 : maxAge;

  _queueCleaners = () => {
    queueOfCleaners.push({ time: validMaxAge, value: `${name+args}` });
    queueOfCleaners.sort((a, b) => a.time > b.time ? 1 : -1);
  }

  const _memorize = () => {
    const callbackResult = callback.apply(this, [...args]);
    cache[`${name+args}`] = callbackResult ? callbackResult : true;
    _queueCleaners();
    setTimeout(_clearCache, validMaxAge);
  }

  const _clearCache = () => {
    const concernedTimeout = queueOfCleaners.splice(0, 1)[0].value;
    delete cache[concernedTimeout];
  }

  return (...funcArgs) => {
    args = funcArgs.length ? funcArgs : 'none';
    if (!cache[`${name+args}`]) {
      _memorize();
    }
    return cache[`${name+args}`];
  };
}
