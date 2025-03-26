import { describe, expect, test } from 'vitest';

import { recursiveRange } from './recursiveRange';

describe('recursiveRange()', () => {
  test.each([
    { number: 0, expectedResult: 0 },
    { number: 1, expectedResult: 1 },
    { number: 2, expectedResult: 3 },
    { number: 3, expectedResult: 6 },
    { number: 4, expectedResult: 10 },
    { number: 5, expectedResult: 15 },
    { number: 6, expectedResult: 21 },
    { number: 7, expectedResult: 28 },
  ])(
    'number: $number, expectedResult: $expectedResult',
    ({ expectedResult, number }) => {
      // Act
      const actualResult = recursiveRange(number);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
