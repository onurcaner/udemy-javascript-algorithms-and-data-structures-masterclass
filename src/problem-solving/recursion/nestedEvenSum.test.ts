import { describe, expect, test } from 'vitest';

import { nestedEvenSum } from './nestedEvenSum';

interface ArrangeParameters {
  input: Record<string, unknown>;
  expectedResult: number;
}

describe('nestedEvenSum()', () => {
  test.each<ArrangeParameters>([
    {
      input: {},
      expectedResult: 0,
    },
    {
      input: { q1: 1 },
      expectedResult: 0,
    },
    {
      input: { q: 2 },
      expectedResult: 2,
    },
    {
      input: { q: '1' },
      expectedResult: 0,
    },
    {
      input: { q: true },
      expectedResult: 0,
    },
    {
      input: { q: [2] },
      expectedResult: 2,
    },

    {
      input: {
        q1: 2,
        q2: { w1: 1, w2: 2 },
      },
      expectedResult: 4,
    },
    {
      input: {
        q1: 2,
        q2: {
          w1: 1,
          w2: 2,
          w3: {
            e1: 1,
            e2: 2,
            e3: {},
            e4: [
              1,
              2,
              [2],
              {
                f: 2,
              },
            ],
          },
        },
      },
      expectedResult: 12,
    },
  ])(
    'input: $input, expectedResult: $expectedResult',
    ({ expectedResult, input }) => {
      // Act
      const actualResult = nestedEvenSum(input);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
