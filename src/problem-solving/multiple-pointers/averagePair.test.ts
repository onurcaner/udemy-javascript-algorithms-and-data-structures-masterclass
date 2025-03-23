import { describe, expect, test } from 'vitest';

import { averagePair } from './averagePair';

describe('averagePair()', () => {
  describe('if number array length is at most 2, return false', () => {
    test.each([{ numbers: [] }, { numbers: [1] }, { numbers: [2] }])(
      'numbers: $numbers',
      ({ numbers }) => {
        // Arrange
        const expectedResult = false;
        const targetAverage = 0;

        // Act
        const actualResult = averagePair(numbers, targetAverage);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  describe('if number array length is 2', () => {
    test.each([
      { numbers: [1, 3], targetAverage: 2, expectedResult: true },
      { numbers: [1, 4], targetAverage: 2, expectedResult: false },
    ])(
      'numbers: $numbers, targetAverage: $targetAverage, expectedResult: $expectedResult',
      ({ numbers, targetAverage, expectedResult }) => {
        // Act
        const actualResult = averagePair(numbers, targetAverage);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  describe('if number array length is more than 2', () => {
    test.each([
      { numbers: [1, 1, 3], targetAverage: 2, expectedResult: true },
      { numbers: [1, 4, 4], targetAverage: 2, expectedResult: false },

      { numbers: [1, 2, 3, 4], targetAverage: 2.5, expectedResult: true },
      { numbers: [1, 2, 3, 4], targetAverage: 3.5, expectedResult: true },
      { numbers: [1, 2, 3, 4], targetAverage: 5, expectedResult: false },

      {
        numbers: [1, 2, 2, 3, 3, 3, 4, 6],
        targetAverage: 2,
        expectedResult: true,
      },
      {
        numbers: [1, 2, 2, 3, 3, 3, 4, 6],
        targetAverage: 4.5,
        expectedResult: true,
      },
      {
        numbers: [1, 2, 2, 3, 3, 3, 4, 6],
        targetAverage: 2,
        expectedResult: true,
      },
      {
        numbers: [1, 2, 2, 3, 3, 3, 4, 6],
        targetAverage: 3.33,
        expectedResult: false,
      },
    ])(
      'numbers: $numbers, targetAverage: $targetAverage, expectedResult: $expectedResult',
      ({ numbers, targetAverage, expectedResult }) => {
        // Act
        const actualResult = averagePair(numbers, targetAverage);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });
});
