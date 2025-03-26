import { describe, expect, test } from 'vitest';

import { someRecursive } from './someRecursive';

interface ArrangeParameters<T> {
  items: T[];
  callback: (item: T) => boolean;
  expectedResult: boolean;
}

describe('someRecursive()', () => {
  describe('number collection', () => {
    function isPositive(number: number): boolean {
      return number >= 0;
    }

    test.each<ArrangeParameters<number>>([
      {
        items: [],
        callback: isPositive,
        expectedResult: false,
      },
      {
        items: [-1],
        callback: isPositive,
        expectedResult: false,
      },
      {
        items: [1],
        callback: isPositive,
        expectedResult: true,
      },

      {
        items: [-4, -4, -2, -1, -8, -9],
        callback: isPositive,
        expectedResult: false,
      },
      {
        items: [-4, -4, -2, 10, -8, -9],
        callback: isPositive,
        expectedResult: true,
      },
    ])(
      'items: $items, callback: isPositive, expectedResult: $expectedResult',
      ({ callback, expectedResult, items }) => {
        // Act
        const actualResult = someRecursive(items, callback);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  describe('string collection', () => {
    function isEmpty(string: string): boolean {
      return string.length === 0;
    }

    test.each<ArrangeParameters<string>>([
      {
        items: [],
        callback: isEmpty,
        expectedResult: false,
      },
      {
        items: ['q'],
        callback: isEmpty,
        expectedResult: false,
      },
      {
        items: [''],
        callback: isEmpty,
        expectedResult: true,
      },

      {
        items: ['q', 'qwe', 'ewq', 'eqq'],
        callback: isEmpty,
        expectedResult: false,
      },
      {
        items: ['q', 'qwe', '', 'eqq'],
        callback: isEmpty,
        expectedResult: true,
      },
    ])(
      'items: $items, callback: isEmpty, expectedResult: $expectedResult',
      ({ callback, expectedResult, items }) => {
        // Act
        const actualResult = someRecursive(items, callback);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });
});
