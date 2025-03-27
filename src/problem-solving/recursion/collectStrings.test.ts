import { describe, expect, test } from 'vitest';

import { collectStrings } from './collectStrings';

describe('collectStrings()', () => {
  test.each<{ object: object; expectedResult: string[] }>([
    {
      object: {},
      expectedResult: [],
    },
    {
      object: {
        q1: 1,
        q2: true,
        q3: null,
        q4: '2',
      },
      expectedResult: ['2'],
    },
    {
      object: {
        q1: [1, 2, 3],
        q2: true,
        q3: null,
        q4: '2',
        q5: {
          w1: [1, 2, 3],
          w2: true,
          w3: null,
          w4: '3',
        },
      },
      expectedResult: ['2', '3'],
    },
    {
      object: {
        q1: [1, 2, 3],
        q2: true,
        q3: null,
        q4: '2',
        q5: {
          w1: [
            1,
            2,
            3,
            '4',
            [
              {
                e1: '5',
                e2: ['6', '7'],
                e3: 5,
                e4: [6, 7],
              },
            ],
          ],
          w2: true,
          w3: null,
          w4: '3',
        },
      },
      expectedResult: ['2', '4', '5', '6', '7', '3'],
    },
  ])(
    'object: $object, expectedResult: $expectedResult',
    ({ expectedResult, object }) => {
      // Act
      const actualResult = collectStrings(object);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    },
  );
});
