import { describe, expect, test } from 'vitest';

import { minCoinChange } from './CoinChangeGreedyAlgorithm';

describe('CoinChangeGreedyAlgorithm', () => {
  test('return [] if (targetAmount <= zero)', () => {
    // Arrange
    const targetAmount = 0;
    const sortedCoins = [2, 3, 5, 7, 11, 13, 17];
    const expectedResult: number[] = [];

    // Act
    const actualResult = minCoinChange(sortedCoins, targetAmount);

    // Assert
    expect(actualResult).toStrictEqual(expectedResult);
  });

  test.each([
    {
      targetAmount: 3,
      sortedCoins: [1, 2, 3],
      expectedResult: [3],
    },
    {
      targetAmount: 5,
      sortedCoins: [1, 2, 3],
      expectedResult: [3, 2],
    },
    {
      targetAmount: 10,
      sortedCoins: [1, 2, 3],
      expectedResult: [3, 3, 3, 1],
    },

    {
      targetAmount: 10,
      sortedCoins: [1, 2, 3, 5, 8],
      expectedResult: [8, 2],
    },
    {
      targetAmount: 15,
      sortedCoins: [1, 2, 3, 5, 8],
      expectedResult: [8, 5, 2],
    },
    {
      targetAmount: 20,
      sortedCoins: [1, 2, 3, 5, 8],
      expectedResult: [8, 8, 3, 1],
    },
  ])(
    'coins: $sortedCoins, targetAmount: $targetAmount, expectedCoins: $expectedResult',
    ({ expectedResult, sortedCoins, targetAmount }) => {
      // Act
      const actualResult = minCoinChange(sortedCoins, targetAmount);

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    },
  );

  test('return [] if challenge is impossible', () => {
    // Arrange
    const targetAmount = 127;
    const sortedCoins = [2, 4, 8, 16, 32];
    const expectedResult: number[] = [];

    // Act
    const actualResult = minCoinChange(sortedCoins, targetAmount);

    // Assert
    expect(actualResult).toStrictEqual(expectedResult);
  });
});
