import add from 'lodash/add';
import divide from 'lodash/divide';
import multiply from 'lodash/multiply';
import subtract from 'lodash/subtract';

const mathOperation = ($) => {
  const mathOperation = $.step.parameters.mathOperation;
  const values = $.step.parameters.values.map((value) => Number(value.input));

  switch (mathOperation) {
    case 'add':
      return values.reduce((acc, curr) => add(acc, curr), 0);
    case 'divide':
      return values.reduce((acc, curr) => divide(acc, curr));
    case 'makeNegative':
      return values.map((value) => -value);
    case 'multiply':
      return values.reduce((acc, curr) => multiply(acc, curr), 1);
    case 'subtract':
      return values.reduce((acc, curr) => subtract(acc, curr));
    default:
      throw new Error(`Invalid math operation: ${mathOperation}`);
  }
};

export default mathOperation;
