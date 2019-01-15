import { Iterable } from 'immutable';

function isDebug() {
  return process.env.NODE_ENV === 'development';
}

function debugError(...args) {
  if (isDebug()) {
    console.error(new Date().toUTCString(), ...args);
  }
}

export function valIn(arg0, ...args) {
  if (!arg0) {
    debugError('Error: invalid arg0 aurgument in valIn()');

    return undefined;
  }
  let currentValue = arg0;
  for (let arg of args) {
    if (!Iterable.isIterable(currentValue)) {
      debugError('intermediate object not an iterable', currentValue);
      break;
    }

    currentValue = currentValue.get(arg);

    // only show error when currentValue is undefined, as emty string or 0 or null can be considered valid
    if (typeof currentValue === 'undefined') {
      debugError('Error: undefined value in valIn()', arg);
      break;
    }
  }

  return currentValue;
}

export function getIn(arg0, ...args) {
  if (!arg0) {
    return undefined;
  }
  let currentValue = arg0;
  for (let arg of args) {
    if (!Iterable.isIterable(currentValue)) {
      break;
    }

    currentValue = currentValue.get(arg);

    // only show error when currentValue is undefined, as emty string or 0 or null can be considered valid
    if (typeof currentValue === 'undefined') {
      break;
    }
  }

  return currentValue;
}
