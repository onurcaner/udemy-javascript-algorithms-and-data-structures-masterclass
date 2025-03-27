import { describe, expect, test } from 'vitest';

import { capitalizeFirst } from './capitalizeFirst';

describe('capitalizeFirst()', () => {
  test.each([
    { strings: [], expectedResult: [] },
    { strings: ['q'], expectedResult: ['Q'] },
    { strings: ['qw'], expectedResult: ['Qw'] },
    { strings: ['qW'], expectedResult: ['QW'] },
    { strings: ['QW'], expectedResult: ['QW'] },

    { strings: ['banana', 'apple'], expectedResult: ['Banana', 'Apple'] },
    {
      strings: ['banana', 'apple', 'melon'],
      expectedResult: ['Banana', 'Apple', 'Melon'],
    },
  ])(
    'strings: $strings, expectedResult: $expectedResult',
    ({ expectedResult, strings }) => {
      // Act
      const actualResult = capitalizeFirst(strings);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    },
  );
});
