import { describe, expect, test } from 'vitest';

import { capitalizeWords } from './capitalizeWords';

describe('capitalizeWords()', () => {
  test.each([
    { words: [], expectedResult: [] },
    { words: ['q'], expectedResult: ['Q'] },
    { words: ['qwe'], expectedResult: ['QWE'] },

    { words: ['eat'], expectedResult: ['EAT'] },
    { words: ['eat', 'sleep'], expectedResult: ['EAT', 'SLEEP'] },
    {
      words: ['eat', 'sleep', 'play'],
      expectedResult: ['EAT', 'SLEEP', 'PLAY'],
    },
  ])(
    'words: $words, expectedResult: $expectedResult',
    ({ expectedResult, words }) => {
      // Act
      const actualResult = capitalizeWords(words);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    },
  );
});
