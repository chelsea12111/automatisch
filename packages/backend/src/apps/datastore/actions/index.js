// get-value.js
export function getValue(obj, path) {
  // implementation here
}

// set-value.js
export function setValue(obj, path, value) {
  // implementation here
}

// index.js
import { getValue as getValueFromModule } from './get-value.js';
import { setValue as setValueFromModule } from './set-value.js';

export {
  getValueFromModule as getValue,
  setValueFromModule as setValue,
};
