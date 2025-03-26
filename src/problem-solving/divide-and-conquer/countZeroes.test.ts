import { describe, expect, test } from 'vitest';

import { countZeroes } from './countZeroes';

describe('countZeroes()', () => {
  test.each([
    {
      sortedBinaries: [],
      expectedResult: 0,
    },
    {
      sortedBinaries: [1],
      expectedResult: 0,
    },
    {
      sortedBinaries: [0],
      expectedResult: 1,
    },

    {
      sortedBinaries: [1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      expectedResult: 5,
    },
    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      expectedResult: 5,
    },
    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      expectedResult: 6,
    },
    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      expectedResult: 6,
    },
    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
      expectedResult: 7,
    },
    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
      expectedResult: 8,
    },

    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
      expectedResult: 1,
    },
    {
      sortedBinaries: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expectedResult: 14,
    },
    {
      sortedBinaries: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      expectedResult: 0,
    },
    {
      sortedBinaries: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      expectedResult: 15,
    },
  ])(
    'binaries: $sortedBinaries, expectedResult: $expectedResult',
    ({ expectedResult, sortedBinaries }) => {
      // Act
      const actualResult = countZeroes(sortedBinaries);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
