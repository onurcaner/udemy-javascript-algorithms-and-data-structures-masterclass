import { describe, expect, test } from 'vitest';

import { validAnagram } from './validAnagram';

describe('validAnagram()', () => {
  describe('both inputs are empty', () => {
    test('return true', () => {
      // Arrange
      const expectedResults = true;
      const first = '';
      const second = '';

      // Act
      const actualResult = validAnagram(first, second);

      // Assert
      expect(actualResult).toBe(expectedResults);
    });
  });

  describe('inputs have one character', () => {
    test.each([
      { first: 'q', second: 'q', expectedResult: true },
      { first: 'q', second: 'w', expectedResult: false },
    ])(
      'first: $first, second: $second, expectedResult: $expectedResult',
      ({ expectedResult, first, second }) => {
        // Act
        const actualResult = validAnagram(first, second);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  describe('inputs have many characters', () => {
    test.each([
      { first: 'qq', second: 'qq', expectedResult: true },
      { first: 'qw', second: 'wq', expectedResult: true },
      { first: 'qw', second: 'we', expectedResult: false },
      { first: 'qww', second: 'qwe', expectedResult: false },
      { first: 'qwweee', second: 'wwqeee', expectedResult: true },
      { first: 'cinema', second: 'iceman', expectedResult: true },
      { first: 'cinema', second: 'icemaa', expectedResult: false },
    ])(
      'first: $first, second: $second, expectedResult: $expectedResult',
      ({ expectedResult, first, second }) => {
        // Act
        const actualResult = validAnagram(first, second);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });
});
