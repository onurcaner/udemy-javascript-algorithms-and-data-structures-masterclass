import { describe, expect, test } from 'vitest';

import { maxSubarraySum } from './maxSubarraySum';

describe('maxSubarraySum()', () => {
  test('if input array is empty return null', () => {
    // Arrange
    const numbers: number[] = [];
    const subarraySize = 0;
    const expectedResult = null;

    // Act
    const actualResult = maxSubarraySum(numbers, subarraySize);

    // Assert
    expect(actualResult).toBe(expectedResult);
  });

  describe('if subarraySize larger than input array, return null', () => {
    test.each([
      {
        numbers: [1],
        subarraySize: 2,
      },
      {
        numbers: [1, 2, 3],
        subarraySize: 4,
      },
    ])(
      'numbers: $numbers, subarraySize: $subarraySize',
      ({ numbers, subarraySize }) => {
        // Arrange
        const expectedResult = null;

        // Act
        const actualResult = maxSubarraySum(numbers, subarraySize);

        // Assert
        expect(actualResult).toBe(expectedResult);
      },
    );
  });

  test.each([
    {
      numbers: [1],
      subarraySize: 1,
      expectedResult: 1,
    },
    {
      numbers: [1, 2, 3],
      subarraySize: 2,
      expectedResult: 5,
    },
    {
      numbers: [1, 2, 3, 4, 5],
      subarraySize: 3,
      expectedResult: 12,
    },

    {
      numbers: [-2, 0, 2, 6, 2, 4, 0, 0, 8],
      subarraySize: 1,
      expectedResult: 8,
    },
    {
      numbers: [-2, 0, 2, 6, 2, 4, 0, 0, 8],
      subarraySize: 2,
      expectedResult: 8,
    },
    {
      numbers: [-2, 0, 2, 6, 2, 4, 0, 0, 8],
      subarraySize: 3,
      expectedResult: 12,
    },
    {
      numbers: [-2, 0, 2, 6, 2, 4, 0, 0, 8],
      subarraySize: 4,
      expectedResult: 14,
    },
  ])(
    'numbers: $numbers, subarraySize: $subarraySize, expectedResult: $expectedResult',
    ({ expectedResult, numbers, subarraySize }) => {
      // Act
      const actualResult = maxSubarraySum(numbers, subarraySize);

      // Assert
      expect(actualResult).toBe(expectedResult);
    },
  );
});
