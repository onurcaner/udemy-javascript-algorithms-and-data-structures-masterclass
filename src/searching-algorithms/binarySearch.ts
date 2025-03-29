export function binarySearch(
  sortedNumbers: number[],
  searchNumber: number,
): number {
  return new BinarySearch(sortedNumbers, searchNumber).execute();
}

class BinarySearch {
  private leftIndex = 0;
  private rightIndex: number;
  private foundIndex = -1;
  constructor(
    private numbers: number[],
    private searchNumber: number,
  ) {
    this.rightIndex = this.numbers.length - 1;
  }

  execute(): number {
    try {
      this.evaluate();
    } catch (error) {
      if (!(error instanceof ArrayIsExhausted)) throw error;
    }

    return this.foundIndex;
  }

  private evaluate(): void {
    if (this.leftIndex > this.rightIndex) throw new ArrayIsExhausted();

    const middleIndex = Math.floor((this.leftIndex + this.rightIndex) / 2);
    const middleNumber = this.numbers.at(middleIndex);
    if (middleNumber === undefined) throw new Error('??');

    if (middleNumber > this.searchNumber) {
      this.rightIndex = middleIndex - 1;
    }
    if (middleNumber < this.searchNumber) {
      this.leftIndex = middleIndex + 1;
    }
    if (middleNumber === this.searchNumber) {
      this.foundIndex = middleIndex;
      this.rightIndex = middleIndex - 1;
    }

    this.evaluate();
  }
}

class ArrayIsExhausted extends Error {}
