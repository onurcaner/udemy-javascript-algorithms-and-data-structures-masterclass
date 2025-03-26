import { describe, expect, test } from 'vitest';

import { sortedFrequency } from './sortedFrequency';

describe('sortedFrequency()', () => {
  test.each([
    {
      sortedNumbers: [],
      targetNumber: 0,
      expectedResult: -1,
    },
    {
      sortedNumbers: [0],
      targetNumber: 0,
      expectedResult: 1,
    },
    {
      sortedNumbers: [1],
      targetNumber: 0,
      expectedResult: -1,
    },

    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 0,
      expectedResult: -1,
    },
    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 1,
      expectedResult: 1,
    },
    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 2,
      expectedResult: 2,
    },
    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 3,
      expectedResult: 3,
    },
    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 4,
      expectedResult: 4,
    },
    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 5,
      expectedResult: 5,
    },
    {
      sortedNumbers: [1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5],
      targetNumber: 6,
      expectedResult: -1,
    },
  ])(
    'numbers: $sortedNumbers, targetNumber: $targetNumber, expectedResult: $expectedResult',
    ({ expectedResult, sortedNumbers, targetNumber }) => {
      // Act
      const actualResult = sortedFrequency(sortedNumbers, targetNumber);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
