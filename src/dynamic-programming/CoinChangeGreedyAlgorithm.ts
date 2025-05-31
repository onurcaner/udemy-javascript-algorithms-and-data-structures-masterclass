export function minCoinChange(
  sortedCoins: number[],
  targetAmount: number,
): number[] {
  return new CoinChangeGreedyAlgorithm(sortedCoins).calculateBestCombination(
    targetAmount,
  );
}

export class CoinChangeGreedyAlgorithm {
  private coinIndex: number;
  private resultedCombination: number[] = [];
  public constructor(private sortedCoins: number[]) {
    this.coinIndex = sortedCoins.length - 1;
  }

  public calculateBestCombination(targetAmount: number): number[] {
    if (targetAmount <= 0) return [];

    const resultedCoins = this.executeGreedyAlgorithm(targetAmount);
    return resultedCoins;
  }

  private executeGreedyAlgorithm(targetAmount: number): number[] {
    const currentAmount = this.calculateCurrentAmount();

    if (currentAmount === targetAmount) {
      return this.resultedCombination;
    }

    if (currentAmount < targetAmount) {
      const nextCoin = this.yieldCoin();
      if (nextCoin === undefined) return [];

      this.resultedCombination.push(nextCoin);
    }

    if (currentAmount > targetAmount) {
      this.resultedCombination.pop();
      this.coinIndex--;
    }

    return this.executeGreedyAlgorithm(targetAmount);
  }

  private calculateCurrentAmount(): number {
    return this.resultedCombination.reduce((total, coin) => total + coin, 0);
  }

  private yieldCoin(): number | undefined {
    if (this.coinIndex < 0) return undefined;
    else return this.sortedCoins[this.coinIndex];
  }
}
