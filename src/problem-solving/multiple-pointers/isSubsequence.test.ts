import { describe, expect, test } from 'vitest';

import { isSubsequence } from './isSubsequence';

describe('isSubsequence()', () => {
  test('if first string is empty return true', () => {
    // Arrange
    const first = '';
    const second = '';
    const expectedResult = true;

    // Act
    const actualResult = isSubsequence(first, second);

    // Assert
    expect(actualResult).toBe(expectedResult);
  });

  test.each([
    { first: 'q', second: 'q', expectedResult: true },
    { first: 'q', second: 'w', expectedResult: false },

    { first: 'q', second: 'qwe', expectedResult: true },
    { first: 'e', second: 'qwe', expectedResult: true },

    { first: 'qwe', second: 'eeeqqqeeewe', expectedResult: true },
    { first: 'qwe', second: 'eeeqqqeeew', expectedResult: false },

    { first: 'cat', second: 'qqq c qqq a qqq t qqq', expectedResult: true },
    { first: 'cat', second: 'qqq c qqq t qqq a qqq', expectedResult: false },
  ])(
    'first: $first, second: $second, expectedResult: $expectedResult',
    ({ expectedResult, first, second }) => {
      // Act
      const actualResult = isSubsequence(first, second);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
