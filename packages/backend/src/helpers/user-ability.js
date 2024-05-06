import { PureAbility, fieldPatternMatcher, mongoQueryMatcher } from '@casl/ability';

export default function userAbility(user) {
  const permissions = user?.permissions || [];
  const role = user?.role || 'guest'; // Set a default value for role

  const options = {
    conditionsMatcher: mongoQueryMatcher,
    fieldMatcher: fieldPatternMatcher,
  };

  return new PureAbility(permissions, options);
}

