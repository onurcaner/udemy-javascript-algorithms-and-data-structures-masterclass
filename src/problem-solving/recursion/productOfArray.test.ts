import { describe, expect, test } from 'vitest';

import { productOfArray } from './productOfArray';

describe('productOfArray()', () => {
  test.each([
    { numbers: [], expectedResult: NaN },
    { numbers: [0], expectedResult: 0 },
    { numbers: [1], expectedResult: 1 },
    { numbers: [1, 2], expectedResult: 2 },
    { numbers: [1, 2, 3], expectedResult: 6 },
    { numbers: [1, 2, 3, 5], expectedResult: 30 },
    { numbers: [1, 2, 3, 5, 10], expectedResult: 300 },
    { numbers: [1, 2, 3, 5, 10, 3], expectedResult: 900 },
    { numbers: [1, 2, 3, 5, 10, 3, 2], expectedResult: 1800 },
    { numbers: [1, 2, 3, 5, 10, 3, 2, 0.5], expectedResult: 900 },
  ])(
    'numbers: $numbers, expectedResult: $expectedResult',
    ({ expectedResult, numbers }) => {
      // Act
      const actualResult = productOfArray(numbers);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
