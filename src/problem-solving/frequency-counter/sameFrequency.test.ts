import { describe, expect, test } from 'vitest';

import { sameFrequency } from './sameFrequency';

describe('sameFrequency()', () => {
  describe('inputs are single digit', () => {
    test.each([
      { first: 1, second: 1, expectedResult: true },
      { first: 2, second: 2, expectedResult: true },
      { first: 3, second: 4, expectedResult: false },
    ])(
      'first: $first, second: $second, expectedResult: $expectedResult',
      ({ expectedResult, first, second }) => {
        // Act
        const actualResult = sameFrequency(first, second);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  describe('inputs are many digit', () => {
    test.each([
      { first: 123, second: 321, expectedResult: true },
      { first: 112233, second: 123123, expectedResult: true },
      { first: 111223, second: 122333, expectedResult: false },
      { first: 112233, second: 123456, expectedResult: false },
    ])(
      'first: $first, second: $second, expectedResult: $expectedResult',
      ({ expectedResult, first, second }) => {
        // Act
        const actualResult = sameFrequency(first, second);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });
});
