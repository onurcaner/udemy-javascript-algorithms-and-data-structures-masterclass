import { describe, expect, test } from 'vitest';

import { findPair } from './findPair';

describe('findPair()', () => {
  test.each([{ numbers: [] }, { numbers: [1] }, { numbers: [2] }])(
    'if input: $numbers has at most one number, return false',
    ({ numbers }) => {
      // Arrange
      const difference = 0;
      const expectedResult = false;

      // Act
      const actualResult = findPair(numbers, difference);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );

  test.each([
    { numbers: [1, 2, 3], difference: 0, expectedResult: false },
    { numbers: [1, 2, 3], difference: 1, expectedResult: true },
    { numbers: [1, 2, 3], difference: -1, expectedResult: true },
    { numbers: [1, 2, 3], difference: 2, expectedResult: true },
    { numbers: [1, 2, 3], difference: -2, expectedResult: true },

    { numbers: [4, 5, 6, 8, 5, 2], difference: 0, expectedResult: true },
    { numbers: [4, 5, 6, 8, 5, 2], difference: 4, expectedResult: true },
    { numbers: [4, 5, 6, 8, 5, 2], difference: 5, expectedResult: false },
  ])(
    'numbers: $numbers, difference: $difference, expectedResult: $expectedResult',
    ({ difference, expectedResult, numbers }) => {
      // Act
      const actualResult = findPair(numbers, difference);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
