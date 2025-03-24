import { describe, expect, test } from 'vitest';

import { findLongestSubstring } from './findLongestSubstring';

describe('findLongestSubstring()', () => {
  test.each([
    {
      input: '',
      expectedResult: 0,
    },
    {
      input: '1',
      expectedResult: 1,
    },
    {
      input: '11111',
      expectedResult: 1,
    },

    {
      input: '112211',
      expectedResult: 2,
    },
    {
      input: '112231',
      expectedResult: 3,
    },
    {
      input: '11223111',
      expectedResult: 3,
    },
    {
      input: '11223411',
      expectedResult: 4,
    },
    {
      input: '11223441',
      expectedResult: 3,
    },
  ])(
    'input: $input, expectedResult: $expectedResult',
    ({ expectedResult, input }) => {
      // Act
      const actualResult = findLongestSubstring(input);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
