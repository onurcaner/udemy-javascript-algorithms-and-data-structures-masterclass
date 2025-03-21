import { describe, expect, test } from 'vitest';

import { constructNote } from './constructNote';

describe('constructNote()', () => {
  test('if message is empty return true', () => {
    // Arrange
    const message = '';
    const letters = '';
    const expectedResult = true;

    // Act
    const actualResult = constructNote(message, letters);

    // Assert
    expect(actualResult).toBe(expectedResult);
  });

  test.each([
    { message: 'q', letters: 'q', expectedResult: true },
    { message: 'w', letters: 'w', expectedResult: true },
    { message: 'q', letters: 'w', expectedResult: false },

    { message: 'qq', letters: 'qq', expectedResult: true },
    { message: 'qq', letters: 'qqq', expectedResult: true },
    { message: 'qqq', letters: 'qq', expectedResult: false },

    { message: 'qwe', letters: 'qwe', expectedResult: true },
    { message: 'qqwe', letters: 'qwe', expectedResult: false },
    { message: 'qwe', letters: 'qwee', expectedResult: true },
    { message: 'qwweee', letters: 'eeewwq', expectedResult: true },
    { message: 'qwweee', letters: 'qweqweqwe', expectedResult: true },
  ])(
    'message: $message, letters: $letters , expectedResult: $expectedResult',
    ({ expectedResult, letters, message }) => {
      // Act
      const actualResult = constructNote(message, letters);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
