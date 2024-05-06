import { StepParameters } from './step-parameters';

const replace = (parameters: StepParameters): string => {
  const { input, find, replace } = parameters;

  if (typeof find !== 'string' || typeof replace !== 'string') {
    throw new Error('The `find` and `replace` parameters must be strings');
  }

  return input.replaceAll(find, replace);
};

export default replace;



export interface StepParameters {
  input: string;
  find: string;
  replace: string;
}

