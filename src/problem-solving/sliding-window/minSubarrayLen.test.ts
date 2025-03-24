import { describe, expect, test } from 'vitest';

import { minSubarrayLen } from './minSubarrayLen';

describe('minSubarrayLen()', () => {
  test.each([
    {
      numbers: [],
      targetSum: 100,
      expectedResult: 0,
    },
    {
      numbers: [1],
      targetSum: 1,
      expectedResult: 1,
    },
    {
      numbers: [2],
      targetSum: 1,
      expectedResult: 1,
    },
    {
      numbers: [2],
      targetSum: 3,
      expectedResult: 0,
    },

    {
      numbers: [1, 2, 3],
      targetSum: 3,
      expectedResult: 1,
    },
    {
      numbers: [1, 1, 1, 1, 1, 1],
      targetSum: 6,
      expectedResult: 6,
    },
    {
      numbers: [1, 1, 1, 1, 1, 1],
      targetSum: 7,
      expectedResult: 0,
    },

    {
      numbers: [5, 1, 2, 6, 9, 5, 4, 7, 8, 9, 5, 4],
      targetSum: 10,
      expectedResult: 2,
    },
    {
      numbers: [5, 1, 2, 6, 9, 5, 4, 7, 8, 9, 5, 4],
      targetSum: 15,
      expectedResult: 2,
    },
    {
      numbers: [5, 1, 2, 6, 9, 5, 4, 7, 8, 9, 5, 4],
      targetSum: 20,
      expectedResult: 3,
    },
    {
      numbers: [5, 1, 2, 6, 9, 5, 4, 7, 8, 9, 5, 4],
      targetSum: 25,
      expectedResult: 4,
    },
    {
      numbers: [5, 1, 2, 6, 9, 5, 4, 7, 8, 9, 5, 4],
      targetSum: 2500,
      expectedResult: 0,
    },
  ])(
    'numbers: $numbers, targetSum: $targetSum, expectedResult: $expectedResult',
    ({ expectedResult, numbers, targetSum: sumTarget }) => {
      // Act
      const actualResult = minSubarrayLen(numbers, sumTarget);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
