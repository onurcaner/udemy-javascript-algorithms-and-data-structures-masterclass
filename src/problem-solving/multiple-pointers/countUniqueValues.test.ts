import { describe, expect, test } from 'vitest';

import { countUniqueValues } from './countUniqueValues';

describe('countUniqueValues()', () => {
  describe('return 0', () => {
    test('If input is empty array', () => {
      // Arrange
      const numbers: number[] = [];
      const expectedResult = 0;

      // Act
      const actualResult = countUniqueValues(numbers);

      // Assert
      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('return 1', () => {
    test.each([{ numbers: [1] }, { numbers: [2] }, { numbers: [3] }])(
      'If input is an array with one number; input: $numbers',
      ({ numbers }) => {
        // Arrange
        const expectedResult = 1;

        // Act
        const actualResult = countUniqueValues(numbers);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  describe('return count', () => {
    test.each([
      { numbers: [1, 2], expectedResult: 2 },
      { numbers: [1, 1], expectedResult: 1 },
      { numbers: [2, 2], expectedResult: 1 },

      { numbers: [1, 2, 3, 4], expectedResult: 4 },
      { numbers: [1, 2, 2, 4], expectedResult: 3 },
      { numbers: [2, 2, 4, 4], expectedResult: 2 },
      { numbers: [2, 4, 4, 4], expectedResult: 2 },
      { numbers: [4, 4, 4, 4], expectedResult: 1 },
    ])(
      'input: $numbers, expectedResult: $expectedResult',
      ({ numbers, expectedResult }) => {
        // Act
        const actualResult = countUniqueValues(numbers);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });
});
