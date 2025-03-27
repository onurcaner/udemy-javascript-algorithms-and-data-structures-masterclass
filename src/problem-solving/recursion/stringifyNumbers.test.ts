import { describe, expect, test } from 'vitest';

import { stringifyNumbers } from './stringifyNumbers';

interface ArrangeParameters {
  object: object;
  expectedResult: object;
}

describe('stringifyNumbers()', () => {
  test.each<ArrangeParameters>([
    {
      object: {},
      expectedResult: {},
    },
    {
      object: {
        q: 1,
      },
      expectedResult: {
        q: '1',
      },
    },
    {
      object: {
        q: [1, 2, 3],
      },
      expectedResult: {
        q: ['1', '2', '3'],
      },
    },
    {
      object: {
        q: [
          1,
          2,
          3,
          {
            w1: 1,
            w2: {
              e1: 2,
              e2: [3, 4],
            },
          },
        ],
      },
      expectedResult: {
        q: [
          '1',
          '2',
          '3',
          {
            w1: '1',
            w2: {
              e1: '2',
              e2: ['3', '4'],
            },
          },
        ],
      },
    },
  ])(
    'object: $object, expectedResult: $expectedResult',
    ({ expectedResult, object }) => {
      // Act
      const actualResult = stringifyNumbers(object);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    },
  );
});
