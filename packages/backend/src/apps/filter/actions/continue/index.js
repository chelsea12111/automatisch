import defineAction from '../../../../helpers/define-action.js';

const isEqual = (a, b) => a === b;
const isNotEqual = (a, b) => !isEqual(a, b);
const isGreaterThan = (a, b) => Number(a) > Number(b);
const isLessThan = (a, b) => Number(a) < Number(b);
const isGreaterThanOrEqual = (a, b) => Number(a) >= Number(b);
const isLessThanOrEqual = (a, b) => Number(a) <= Number(b);
const contains = (a, b) => a.includes(b);
const doesNotContain = (a, b) => !contains(a, b);

const operators = {
  equal: isEqual,
  not_equal: isNotEqual,
  greater_than: isGreaterThan,
  less_than: isLessThan,
  greater_than_or_equal: isGreaterThanOrEqual,
  less_than_or_equal: isLessThanOrEqual,
  contains,
  not_contains,
};

const isOperatorValid = (operator) => {
  return Object.keys(operators).includes(operator);
};

const operate = (operation, a, b) => {
  if (!isOperatorValid(operation)) {
    throw new Error(`Invalid operator: ${operation}`);
  }
  return operators[operation](a, b);
};

const shouldContinue = (orGroups) => {
  return orGroups.some((group) => {
    return group.and.every((condition) => {
      return operate(condition.operator, condition.key, condition.value);
    });
  });
};

export default defineAction({
  name: 'Continue if conditions match',
  key: 'continueIfMatches',
  description: 'Let the execution continue if the conditions match',
  arguments: [],

  async run($) {
    const orGroups = $.step.parameters.or;

    if (!Array.isArray(orGroups) || !orGroups.length) {
      throw new Error('Invalid `or` parameter');
    }

    const matchingGroups = orGroups.reduce((groups, group) => {
      const matchingConditions = group.and.filter((condition) =>
        operate(condition.operator, condition.key, condition.value)
      );

      if (matchingConditions.length) {
        return groups.concat([{ and: matchingConditions }]);
      }

      return groups;
    }, []);

    if (!shouldContinue(orGroups)) {
      $.execution.exit();
    }

    $.setActionItem({
      raw: {
        or: matchingGroups,
      },
    });
  },
});
