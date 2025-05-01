import { describe, expect, test } from 'vitest';

import { linearSearch } from './linearSearch';

interface ArrangeParameters<T = unknown> {
  values: T[];
  searchValue: T;
  expectedResult: number;
}

describe('linearSearch()', () => {
  test.each<ArrangeParameters>([
    {
      values: [],
      searchValue: 'q',
      expectedResult: -1,
    },
    {
      values: ['q'],
      searchValue: 'q',
      expectedResult: 0,
    },
    {
      values: ['w'],
      searchValue: 'q',
      expectedResult: -1,
    },

    {
      values: [1, '2', 2, 3],
      searchValue: 2,
      expectedResult: 2,
    },
    {
      values: [1, '2', 2, 3],
      searchValue: '2',
      expectedResult: 1,
    },
    {
      values: [1, '2', 2, 3],
      searchValue: 4,
      expectedResult: -1,
    },
  ])(
    'values: $values, searchValue: $searchValue, expectedResult: $expectedResult',
    ({ expectedResult, searchValue, values }) => {
      // Act
      const actualResult = linearSearch(values, searchValue);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
