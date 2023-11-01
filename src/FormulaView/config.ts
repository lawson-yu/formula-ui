export const operators = ['+', '-', '*', '/', '()', '||', '∑'];

export const specialOperators = {
  '||': 'abs()',
  '∑': 'sum()',
};

export const singleOperators = operators.join('').split('');
