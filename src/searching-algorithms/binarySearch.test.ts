import { describe, expect, test } from 'vitest';

import { binarySearch } from './binarySearch';

describe('binarySearch()', () => {
  test.each([
    {
      numbers: [],
      searchNumber: 1,
      expectedResult: -1,
    },
    {
      numbers: [1],
      searchNumber: 1,
      expectedResult: 0,
    },
    {
      numbers: [1],
      searchNumber: 2,
      expectedResult: -1,
    },
    {
      numbers: [1, 2, 3, 4, 5],
      searchNumber: 2,
      expectedResult: 1,
    },
    {
      numbers: [1, 2, 2, 2, 2, 3, 4, 5],
      searchNumber: 2,
      expectedResult: 1,
    },
  ])(
    'numbers: $numbers, searchNumber: $searchNumber, expectedResult: $expectedResult',
    ({ expectedResult, numbers, searchNumber }) => {
      // Act
      const actualResult = binarySearch(numbers, searchNumber);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
