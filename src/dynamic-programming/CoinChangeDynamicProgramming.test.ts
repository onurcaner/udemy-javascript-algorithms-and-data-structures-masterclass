import { describe, expect, test } from 'vitest';

/* import { CoinChangeDynamicProgramming } from './CoinChangeDynamicProgramming'; */
import { CoinChangeDynamicProgrammingHigherPerformance } from './CoinChangeDynamicProgrammingHigherPerformance';

describe('CoinChangeDynamicProgramming', () => {
  test('return [] if targetAmount <= 0', () => {
    // Arrange
    const sortedCoins = [1, 2, 3, 5, 8];
    const targetAmount = 0;
    const expectedCombinations: number[][] = [];

    // Act
    const actualCombinations =
      new CoinChangeDynamicProgrammingHigherPerformance(
        sortedCoins,
      ).findAllCombinations(targetAmount);

    // Assert
    expect(actualCombinations).toStrictEqual(expectedCombinations);
  });

  test.each([
    {
      sortedCoins: [1, 2, 3, 5, 8, 13],
      targetAmount: 5,
      expectedCombinations: [
        [5],
        [3, 2],
        [3, 1, 1],
        [2, 2, 1],
        [2, 1, 1, 1],
        [1, 1, 1, 1, 1],
      ],
    },

    {
      sortedCoins: [1, 2, 3, 5, 8, 13],
      targetAmount: 10,
      expectedCombinations: [
        [8, 2],
        [8, 1, 1],

        [5, 5],
        [5, 3, 2],
        [5, 3, 1, 1],
        [5, 2, 1, 1, 1],
        [5, 1, 1, 1, 1, 1],
        [5, 2, 2, 1],

        [3, 3, 3, 1],
        [3, 3, 2, 1, 1],
        [3, 3, 1, 1, 1, 1],
        [3, 2, 1, 1, 1, 1, 1],
        [3, 1, 1, 1, 1, 1, 1, 1],
        [3, 3, 2, 2],
        [3, 3, 2, 1, 1],
        [3, 2, 2, 2, 1],
        [3, 2, 2, 1, 1, 1],

        [2, 2, 2, 2, 2],
        [2, 2, 2, 2, 1, 1],
        [2, 2, 2, 1, 1, 1, 1],
        [2, 2, 1, 1, 1, 1, 1, 1],
        [2, 1, 1, 1, 1, 1, 1, 1, 1],

        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      ],
    },
  ])(
    'coins: $sortedCoins, targetAmount: $targetAmount',
    ({ expectedCombinations, sortedCoins, targetAmount }) => {
      // Act
      const actualCombinations =
        new CoinChangeDynamicProgrammingHigherPerformance(
          sortedCoins,
        ).findAllCombinations(targetAmount);

      // Assert
      expectedCombinations.forEach((expectedCombination) => {
        expect(actualCombinations).toContainEqual(expectedCombination);
      });
    },
  );

  test('return [] if targetAmount can not be summed with current coins', () => {
    // Arrange
    const sortedCoins = [2, 4, 8, 16, 32, 64, 128];
    const targetAmount = 127;
    const expectedCombinations: number[][] = [];

    // Act
    const actualCombinations =
      new CoinChangeDynamicProgrammingHigherPerformance(
        sortedCoins,
      ).findAllCombinations(targetAmount);

    // Assert
    expect(actualCombinations).toStrictEqual(expectedCombinations);
  });

  // eslint-disable-next-line vitest/expect-expect
  test.skip('performance', () => {
    new CoinChangeDynamicProgrammingHigherPerformance([
      1, 5, 10, 25,
    ]).findAllCombinations(500);
  });
});
