import { InsertionSort } from '../sorting-algorithms/InsertionSort';
import { CoinChangeGreedyAlgorithm } from './CoinChangeGreedyAlgorithm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function coinChange(sortedCoins: number[], targetAmount: number): number {
  return new CoinChangeDynamicProgrammingHigherPerformance(
    sortedCoins,
  ).findAllCombinations(targetAmount).length;
}

export class CoinChangeDynamicProgrammingHigherPerformance {
  private discoveredCombinations: number[][] = [];
  private discoveredCombinationsMap = new Map<number | string, true>();
  public constructor(private sortedCoins: number[]) {}

  public findAllCombinations(targetAmount: number): number[][] {
    Array.from({ length: this.sortedCoins.length }).forEach((_, index) => {
      const bestCombination = new CoinChangeGreedyAlgorithm(
        this.sortedCoins.slice(0, index + 1),
      ).calculateBestCombination(targetAmount);

      this.executeDynamicProgramming(bestCombination);
    });

    return this.discoveredCombinations;
  }

  private executeDynamicProgramming(combination: number[]): void {
    if (combination.length === 0) return;

    // Check memo
    const isDiscovered = this.isDiscovered(combination);
    if (isDiscovered) return;
    this.discover(combination);

    // Tear down combinations and recursively call itself
    for (const index of this.findStartOfChunkIndexes(combination)) {
      const targetCoin = combination[index];
      const allowedSortedCoins = this.sortedCoins.filter(
        (coin) => coin < targetCoin,
      );
      const tornDownTargetCoin = new CoinChangeGreedyAlgorithm(
        allowedSortedCoins,
      ).calculateBestCombination(targetCoin);
      if (tornDownTargetCoin.length < 2) return;

      const newCombination = [
        ...combination.slice(0, index),
        ...tornDownTargetCoin,
        ...combination.slice(index + 1),
      ];
      const sortedNewCombination = this.sortCombination(newCombination);
      this.executeDynamicProgramming(sortedNewCombination);
    }
  }

  private findStartOfChunkIndexes(combination: number[]): number[] {
    const startOfChunks: number[] = [];
    if (combination.length < 2) return [0];

    combination.forEach((currentValue, index) => {
      const previousValue = combination[index - 1];
      if (previousValue !== currentValue) startOfChunks.push(index);
    });

    return startOfChunks;
  }

  private sortCombination(combination: number[]): number[] {
    return new InsertionSort().sortNumbers({
      numbers: combination,
      compareFunction: (a, b) => b - a,
    });
    return combination.sort((a, b) => b - a);
  }

  private isDiscovered(combination: number[]): boolean {
    const isFound = this.discoveredCombinationsMap.get(
      this.generateMapKey(combination),
    );
    return isFound ?? false;

    const discoveredCombination = this.discoveredCombinations.find(
      (discoveredCombination) =>
        this.areEqual(discoveredCombination, combination),
    );

    if (discoveredCombination) return true;
    else return false;
  }

  private discover(combination: number[]): void {
    this.discoveredCombinations.push(combination);
    this.discoveredCombinationsMap.set(this.generateMapKey(combination), true);
  }

  private generateMapKey(combination: number[]): number | string {
    /* return (
      combination.length.toString() +
      this.findStartOfChunkIndexes(combination).join('')
    ); */

    return combination.join('');
  }

  private areEqual(
    leftCombination: number[],
    rightCombination: number[],
  ): boolean {
    if (leftCombination.length !== rightCombination.length) return false;

    const areAllEqual = Array.from({ length: leftCombination.length })
      .map((_coin, index) => leftCombination[index] === rightCombination[index])
      .reduce((result, current) => result && current, true);

    return areAllEqual;
  }
}
