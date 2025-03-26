import { describe, expect, test } from 'vitest';

import { factorial } from './factorial';

describe('factorial()', () => {
  test.each([
    { number: 0, expectedResult: 1 },
    { number: 1, expectedResult: 1 },
    { number: 2, expectedResult: 2 },
    { number: 3, expectedResult: 6 },
    { number: 4, expectedResult: 24 },
    { number: 5, expectedResult: 120 },
    { number: 6, expectedResult: 720 },
  ])(
    'number: $number, expectedResult: $expectedResult',
    ({ expectedResult, number }) => {
      // Act
      const actualResult = factorial(number);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
