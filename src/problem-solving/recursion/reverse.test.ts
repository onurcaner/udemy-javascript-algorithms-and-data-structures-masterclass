import { describe, expect, test } from 'vitest';

import { reverse } from './reverse';

describe('reverse()', () => {
  test.each([
    { input: '', expectedResult: '' },
    { input: 'q', expectedResult: 'q' },
    { input: 'qw', expectedResult: 'wq' },
    { input: 'qww', expectedResult: 'wwq' },
    { input: 'qqww', expectedResult: 'wwqq' },

    { input: 'awesome', expectedResult: 'emosewa' },
    { input: 'gaming', expectedResult: 'gnimag' },
  ])(
    'input: $input, expectedResult: $expectedResult',
    ({ expectedResult, input }) => {
      // Act
      const actualOutput = reverse(input);

      // Assert
      expect(actualOutput).toBe(expectedResult);
    },
  );
});
