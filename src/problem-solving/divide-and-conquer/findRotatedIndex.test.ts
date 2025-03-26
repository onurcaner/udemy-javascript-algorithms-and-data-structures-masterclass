import { describe, expect, test } from 'vitest';

import { findRotatedIndex } from './findRotatedIndex';

describe('findRotatedIndex()', () => {
  test.each([
    {
      numbers: [],
      targetNumber: 0,
      expectedResult: -1,
    },

    {
      numbers: [1],
      targetNumber: 1,
      expectedResult: 0,
    },
    {
      numbers: [1],
      targetNumber: 2,
      expectedResult: -1,
    },

    {
      numbers: [1, 1],
      targetNumber: 1,
      expectedResult: 0,
    },
    {
      numbers: [1, 2],
      targetNumber: 1,
      expectedResult: 0,
    },
    {
      numbers: [2, 1],
      targetNumber: 1,
      expectedResult: 1,
    },
    {
      numbers: [2, 2],
      targetNumber: 1,
      expectedResult: -1,
    },

    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 5,
      expectedResult: 0,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 6,
      expectedResult: 3,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 7,
      expectedResult: 6,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 8,
      expectedResult: 9,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 0,
      expectedResult: -1,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 1,
      expectedResult: 12,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 2,
      expectedResult: 15,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 3,
      expectedResult: 18,
    },
    {
      numbers: [5, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 8, 1, 1, 1, 2, 2, 2, 3, 3, 3],
      targetNumber: 4,
      expectedResult: -1,
    },
  ])(
    'numbers: $numbers, targetNumber: $targetNumber, expectedResult: $expectedResult',
    ({ expectedResult, numbers, targetNumber }) => {
      // Act
      const actualNumber = findRotatedIndex(numbers, targetNumber);

      // Assert
      expect(actualNumber).toBe(expectedResult);
    },
  );
});
