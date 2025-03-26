import { describe, expect, test } from 'vitest';

import { isPalindrome } from './isPalindrome';

describe('isPalindrome()', () => {
  test.each([
    { input: '', expectedResult: true },
    { input: 'q', expectedResult: true },
    { input: 'qq', expectedResult: true },
    { input: 'qw', expectedResult: false },

    { input: 'qqq', expectedResult: true },
    { input: 'qwq', expectedResult: true },
    { input: 'qww', expectedResult: false },

    { input: 'bananananab', expectedResult: true },
    { input: 'bananananaa', expectedResult: false },
    { input: 'bananaananab', expectedResult: true },
    { input: 'bananaananaa', expectedResult: false },
  ])(
    'input: $input, expectedResult: $expectedResult',
    ({ expectedResult, input }) => {
      // Act
      const actualResult = isPalindrome(input);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
