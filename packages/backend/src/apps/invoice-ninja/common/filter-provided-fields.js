import isObject from 'lodash/isObject.js';

export function filterProvidedFields(body) {
  if (typeof body !== 'object' || body === null) {
    throw new Error('The body parameter must be a non-null object');
  }

  return Object.keys(body).reduce((result, key) => {
    const value = body[key];

    if (isObject(value)) {
      const filteredNestedObj = filterProvidedFields(value);
      if (Object.keys(filteredNestedObj).length > 0) {
        result[key] = filteredNestedObj;
      }
    } else if (value !== undefined) {
      result[key] = value;
    }

    return result;
  }, {});
}

