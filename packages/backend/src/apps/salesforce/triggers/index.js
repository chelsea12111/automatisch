const updatedFieldInRecords = (records, field, newValue) =>
  records.map(record => ({ ...record, [field]: newValue }));

export default updatedFieldInRecords;


import updatedFieldInRecords from './updated-field-in-records.js';

const records = [
  { id: 1, name: 'John', age: 25 },
  { id: 2, name: 'Jane', age: 30 },
];

const updatedRecords = updatedFieldInRecords(records, 'age', 35);
console.log(updatedRecords);
