import { describe, expect, test } from 'vitest';

import { flatten } from './flatten';

interface ArrangeParameters {
  collection: unknown[];
  expectedResult: unknown[];
}

describe('flatten()', () => {
  test.each<ArrangeParameters>([
    {
      collection: [],
      expectedResult: [],
    },

    {
      collection: [0],
      expectedResult: [0],
    },
    {
      collection: [[0]],
      expectedResult: [0],
    },
    {
      collection: [[[0]]],
      expectedResult: [0],
    },
    {
      collection: [[[[0]]], [[1]], [2], 3],
      expectedResult: [0, 1, 2, 3],
    },

    {
      collection: [[[[0], 1], 2], 3],
      expectedResult: [0, 1, 2, 3],
    },
  ])(
    'collection: $collection, expectedResult: $expectedResult',
    ({ collection, expectedResult }) => {
      // Act
      const actualResult = flatten(collection);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    },
  );
});
