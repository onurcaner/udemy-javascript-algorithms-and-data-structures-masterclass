import { describe, expect, test } from 'vitest';

import { BubbleSort } from './BubbleSort';

describe('BubbleSort', () => {
  describe('Empty array as input', () => {
    test('return empty array', () => {
      // Arrange
      const numbers: number[] = [];
      const expectedResult: number[] = [];

      // Act
      const actualResult = new BubbleSort().sortNumbers(numbers);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('Array with one item as input', () => {
    test.each([
      { numbers: [1], expectedResult: [1] },
      { numbers: [5], expectedResult: [5] },
      { numbers: [234213], expectedResult: [234213] },
    ])('numbers: $numbers', ({ expectedResult, numbers }) => {
      // Act
      const actualResult = new BubbleSort().sortNumbers(numbers);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('Normal array as input', () => {
    test.each([
      { numbers: [1, 2, 3, 4, 5], expectedResult: [1, 2, 3, 4, 5] },
      { numbers: [5, 4, 3, 2, 1], expectedResult: [1, 2, 3, 4, 5] },
      { numbers: [1, 3, 5, 4, 2], expectedResult: [1, 2, 3, 4, 5] },

      { numbers: [1, 2, 2, 3, 3, 3], expectedResult: [1, 2, 2, 3, 3, 3] },
      { numbers: [2, 1, 3, 3, 2, 3], expectedResult: [1, 2, 2, 3, 3, 3] },
      { numbers: [3, 2, 3, 2, 3, 1], expectedResult: [1, 2, 2, 3, 3, 3] },
    ])(
      'numbers: $numbers, expectedResult: $expectedResult',
      ({ expectedResult, numbers }) => {
        // Act
        const actualResult = new BubbleSort().sortNumbers(numbers);

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      },
    );
  });

  describe('Normal array as input with compareFunction reversing results', () => {
    test.each([
      { numbers: [1, 2, 3, 4, 5], expectedResult: [5, 4, 3, 2, 1] },
      { numbers: [5, 4, 3, 2, 1], expectedResult: [5, 4, 3, 2, 1] },
      { numbers: [1, 3, 5, 4, 2], expectedResult: [5, 4, 3, 2, 1] },

      { numbers: [1, 2, 2, 3, 3, 3], expectedResult: [3, 3, 3, 2, 2, 1] },
      { numbers: [2, 1, 3, 3, 2, 3], expectedResult: [3, 3, 3, 2, 2, 1] },
      { numbers: [3, 2, 3, 2, 3, 1], expectedResult: [3, 3, 3, 2, 2, 1] },
    ])(
      'numbers: $numbers, expectedResult: $expectedResult',
      ({ expectedResult, numbers }) => {
        // Arrange
        const compareFunction = (left: number, right: number): number =>
          right - left;

        // Act
        const actualResult = new BubbleSort().sortNumbers(
          numbers,
          compareFunction,
        );

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      },
    );
  });
});
