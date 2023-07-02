// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 2, b: 2, action: Action.Add, expected: 4 },
    { a: 3, b: 2, action: Action.Add, expected: 5 },
    { a: 2, b: 2, action: Action.Subtract, expected: 0},
    { a: -2, b: 2, action: Action.Subtract, expected: -4},
    { a: 2, b: 2, action: Action.Multiply, expected: 4},
    { a: -2, b: 2, action: Action.Multiply, expected: -4},
    { a: 2, b: 2, action: Action.Divide, expected: 1},
    { a: -2, b: 2, action: Action.Divide, expected: -1},
    { a: 2, b: 2, action: Action.Exponentiate, expected: 4},
    { a: 2, b: -2, action: Action.Exponentiate, expected: 0.25},
    { a: 2, b: 2, action: '&', expected: null},
    { a: 2, b: 2, action: null, expected: null},
    { a: 2, b: 2, action: '', expected: null},
    { a: 'invalid', b: 2, action: Action.Add, expected: null},
    { a: 2, b: null, action: Action.Add, expected: null},
    { a: '', b: null, action: Action.Add, expected: null},
];

describe('simpleCalculator', () => {
  test.each(testCases)('$a $action $b = $expected', ({a, b, action, expected}) => {
    expect(simpleCalculator({a, b, action})).toBe(expected);
  })
});
