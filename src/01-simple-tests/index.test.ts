// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Add })).toBe(0);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Subtract })).toBe(0);
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Subtract })).toBe(-4);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Multiply })).toBe(4);
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Multiply })).toBe(-4);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Divide })).toBe(1);
    expect(simpleCalculator({ a: -2, b: 2, action: Action.Divide })).toBe(-1);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Exponentiate })).toBe(
      4,
    );
    expect(simpleCalculator({ a: 2, b: -2, action: Action.Exponentiate })).toBe(
      0.25,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 2, b: 2, action: '&' })).toBeNull();
    expect(simpleCalculator({ a: 2, b: 2, action: null })).toBeNull();
    expect(simpleCalculator({ a: 2, b: 2, action: '' })).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'invalid', b: 2, action: Action.Add }),
    ).toBeNull();
    expect(simpleCalculator({ a: 2, b: null, action: Action.Add })).toBeNull();
    expect(simpleCalculator({ a: '', b: null, action: Action.Add })).toBeNull();
  });
});
