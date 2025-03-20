import { describe, expect, test } from 'vitest';

import { areThereDuplicates } from './areThereDuplicates';

describe('areThereDuplicates()', () => {
  test('if input is empty array, return false', () => {
    // Arrange
    const input: unknown[] = [];
    const expectedResult = false;

    // Act
    const actualResult = areThereDuplicates(...input);

    // Assert
    expect(actualResult).toBe(expectedResult);
  });

  describe('one input returns false', () => {
    test.each<{ inputs: unknown[] }>([
      { inputs: [1] },
      { inputs: ['1'] },
      { inputs: [null] },
      { inputs: [undefined] },
      { inputs: [true] },
    ])('inputs: $inputs', ({ inputs }) => {
      // Arrange
      const expectedResult = false;

      // Act
      const actualResult = areThereDuplicates(...inputs);

      // Assert
      expect(actualResult).toBe(expectedResult);
    });
  });

  describe('multiple inputs', () => {
    test.each<{ inputs: unknown[]; expectedResult: boolean }>([
      { inputs: [1, 1], expectedResult: true },
      { inputs: [1, 2], expectedResult: false },
      { inputs: [1, '1'], expectedResult: false },
      { inputs: [1, '1', 1], expectedResult: true },
    ])(
      'inputs: $inputs, expectedResult: $expectedResult',
      ({ inputs, expectedResult }) => {
        // Act
        const actualResult = areThereDuplicates(...inputs);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });
});
