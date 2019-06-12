import { Iterable, List } from 'immutable';

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

// It basically add an item to a list If item exists it updates it with new value,
// otherwise it just adds the item to the list, ie. The list shall not have any duplicated items.
export function setToList(list, compareProp, mapToAdd) {
  const indexToUpdate = list.findIndex((formKey) => {
    return formKey.get(compareProp) === mapToAdd.get(compareProp);
  });

  if (indexToUpdate === -1) {
    // mapToAdd doesn't exists in list
    return list.push(mapToAdd);
  } else {
    // mapToAdd obj exists in list. Update old obj with mapToAdd
    return list.set(indexToUpdate, mapToAdd);
  }
}

export function toJs(imJS) {
  return imJS && imJS.toJS && imJS.toJS();
}

export function strListToString(list, deliminator = ' ') {
  return (
    list &&
    list.reduce &&
    list.reduce((accum, item) => {
      return accum + deliminator + item;
    }, '')
  );
}

export function objListToString(list, propToStringify, deliminator = ' ') {
  return (
    list &&
    list.reduce &&
    list.reduce((accum, item) => {
      return accum + (accum && deliminator) + getIn(item, propToStringify);
    }, '')
  );
}

export function imJsUnion(first, second) {
  let mergedList = List(first);

  second.forEach((item) => {
    const alreadyExists = first.findIndex((firstItem) => {
      return valIn(item, 'id') === valIn(firstItem, 'id');
    });

    if (alreadyExists === -1) {
      mergedList = mergedList.push(item);
    }
  });

  return mergedList;
}
