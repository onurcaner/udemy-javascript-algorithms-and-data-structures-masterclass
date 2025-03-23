export function averagePair(
  sortedNumbers: number[],
  targetAverage: number,
): boolean {
  return new AveragePair(sortedNumbers, targetAverage).execute();
}

class AveragePair {
  private leftPointer = 0;
  private rightPointer: number;
  private doesPairExist = false;
  constructor(
    private sortedNumbers: number[],
    private targetAverage: number,
  ) {
    this.rightPointer = sortedNumbers.length - 1;
  }

  execute(): boolean {
    if (this.sortedNumbers.length < 2) return false;

    this.sortedNumbers.forEach(this.handleForEach.bind(this));
    return this.doesPairExist;
  }

  private handleForEach(): void {
    if (this.leftPointer >= this.rightPointer) return;
    if (this.doesPairExist) return;

    const average =
      (this.sortedNumbers[this.leftPointer] +
        this.sortedNumbers[this.rightPointer]) /
      2;
    if (average === this.targetAverage) {
      this.doesPairExist = true;
    }
    if (average < this.targetAverage) {
      this.leftPointer += 1;
    }
    if (average > this.targetAverage) {
      this.rightPointer -= 1;
    }
  }
}
