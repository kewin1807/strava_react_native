export const mapValue = (object, iteratee) => {
  object = Object(object);
  const result = {};

  Object.keys(object).forEach(key => {
    result[key] = iteratee(object[key], key, object);
  });
  return result;
};

/**
 *
 * @param {object} ref - reference of the conponent
 *
 * The initial watchDog is actually the height of the React tree.
 * Then watchDog will be the flag when we find the wrapped component.
 */
export const getReduxComponentRef = (ref, methodName) => {
  if (!ref) {
    return;
  }
  let element = ref;
  let watchDog = 10;
  while (element._reactInternalFiber && watchDog > 0) {
    if (element[methodName]) {
      return element;
    }
    element =
      element._reactInternalFiber.child &&
      element._reactInternalFiber.child.stateNode;
    watchDog--;
  }
  return;
};
