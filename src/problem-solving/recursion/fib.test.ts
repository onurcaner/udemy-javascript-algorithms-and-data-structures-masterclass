import { describe, expect, test } from 'vitest';

import { fib } from './fib';

describe('fib()', () => {
  test.each([
    { at: 1, expectedResult: 1 },
    { at: 2, expectedResult: 1 },
    { at: 3, expectedResult: 2 },
    { at: 4, expectedResult: 3 },
    { at: 5, expectedResult: 5 },
    { at: 6, expectedResult: 8 },
    { at: 7, expectedResult: 13 },
    { at: 8, expectedResult: 21 },
    { at: 9, expectedResult: 34 },
    { at: 10, expectedResult: 55 },
  ])('at: $at, expectedResult: $expectedResult', ({ expectedResult, at }) => {
    // Act
    const actualResult = fib(at);

    // Assert
    expect(actualResult).toBe(expectedResult);
  });
});
