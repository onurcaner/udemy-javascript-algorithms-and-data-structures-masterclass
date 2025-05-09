import { describe, expect, test } from 'vitest';

import { RadixSort } from './RadixSort';

describe('RadixSort', () => {
  describe('number collection', () => {
    describe('input: empty array', () => {
      test('return empty array', () => {
        // Arrange
        const numbers: number[] = [];
        const expectedResult: number[] = [];

        // Act
        const actualResult = new RadixSort().sortNumbers(numbers);

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      });
    });

    describe('input: array with only one item', () => {
      test.each([
        { numbers: [1], expectedResult: [1] },
        { numbers: [5], expectedResult: [5] },
        { numbers: [234213], expectedResult: [234213] },
      ])('numbers: $numbers', ({ expectedResult, numbers }) => {
        // Act
        const actualResult = new RadixSort().sortNumbers(numbers);

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      });
    });

    describe('normal input', () => {
      test.each([
        { numbers: [1, 2, 2, 3, 3, 3], expectedResult: [1, 2, 2, 3, 3, 3] },
        { numbers: [3, 3, 3, 2, 2, 1], expectedResult: [1, 2, 2, 3, 3, 3] },
        { numbers: [2, 1, 3, 3, 2, 3], expectedResult: [1, 2, 2, 3, 3, 3] },

        {
          numbers: [111111, 111, 11, 1, 1, 11, 1111, 1, 1111, 1111, 111],
          expectedResult: [1, 1, 1, 11, 11, 111, 111, 1111, 1111, 1111, 111111],
        },
        {
          numbers: [12, 546198, 453, 5893, 896, 0, 1212345],
          expectedResult: [0, 12, 453, 896, 5893, 546198, 1212345],
        },
      ])(
        'numbers: $numbers, expectedResult: $expectedResult',
        ({ expectedResult, numbers }) => {
          // Act
          const actualResult = new RadixSort().sortNumbers(numbers);

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });
  });
});
