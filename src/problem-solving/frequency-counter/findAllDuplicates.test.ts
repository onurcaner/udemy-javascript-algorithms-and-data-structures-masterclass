import { describe, expect, test } from 'vitest';

import { findAllDuplicates } from './findAllDuplicates';

describe('findAllDuplicates()', () => {
  test('if input is empty array, return empty array', () => {
    // Arrange
    const numbers: number[] = [];
    const expectedResult: number[] = [];

    // Act
    const actualResult = findAllDuplicates(numbers);

    // Assert
    expect(actualResult).toStrictEqual(expectedResult);
  });

  test.each<Record<'numbers' | 'expectedResult', number[]>>([
    { numbers: [1, 2], expectedResult: [] },
    { numbers: [1, 1], expectedResult: [1] },

    { numbers: [1, 2, 3], expectedResult: [] },
    { numbers: [1, 2, 2], expectedResult: [2] },
    { numbers: [2, 2, 2], expectedResult: [2] },

    { numbers: [1, 2, 3, 4, 5, 3, 4, 5, 5], expectedResult: [3, 4, 5] },
  ])('?', ({ expectedResult, numbers }) => {
    // Act
    const actualResult = findAllDuplicates(numbers);

    // Assert
    expect(actualResult).toStrictEqual(expectedResult);
  });
});
