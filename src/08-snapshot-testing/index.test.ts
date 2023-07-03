// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const testValues = [1, 2, 3];
  const expectedResult = { 
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: { next: null, value: null }
      }
    }
  };

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(testValues)).toStrictEqual(expectedResult);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(testValues)).toMatchSnapshot();
  });
});
