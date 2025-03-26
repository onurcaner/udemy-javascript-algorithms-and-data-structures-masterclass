import { describe, expect, test } from 'vitest';

import { power } from './power';

describe('power()', () => {
  test.each([
    {
      base: 2,
      exponent: 0,
      expectedResult: 1,
    },
    {
      base: 2,
      exponent: 1,
      expectedResult: 2,
    },
    {
      base: 2,
      exponent: 2,
      expectedResult: 4,
    },
    {
      base: 2,
      exponent: 4,
      expectedResult: 16,
    },
    {
      base: 2,
      exponent: 10,
      expectedResult: 1024,
    },

    {
      base: 5,
      exponent: 3,
      expectedResult: 125,
    },
  ])(
    'base: $base, exponent: $exponent, expectedResult: $expectedResult',
    ({ base, expectedResult, exponent }) => {
      // Act
      const actualResult = power(base, exponent);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
