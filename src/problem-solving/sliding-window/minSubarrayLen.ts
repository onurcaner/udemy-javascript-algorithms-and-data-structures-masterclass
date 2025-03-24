export function minSubarrayLen(numbers: number[], targetSum: number): number {
  return new MinSubarrayLen(numbers, targetSum).execute();
}

class MinSubarrayLen {
  private window = {
    startPointer: 0,
    size: 0,
    sum: 0,
  };
  private minWindowSize = Infinity;
  constructor(
    private numbers: number[],
    private targetSum: number,
  ) {
    if (targetSum <= 0) throw new Error('targetSum has to be positive');
  }

  execute(): number {
    Array.from({ length: this.numbers.length * 2 }).forEach(
      this.handleForEach.bind(this),
    );
    if (this.minWindowSize === Infinity) return 0;
    else return this.minWindowSize;
  }

  private handleForEach(): void {
    const currentSum = this.window.sum;

    if (currentSum >= this.targetSum && this.window.size < this.minWindowSize) {
      this.minWindowSize = this.window.size;
    }
    if (currentSum < this.targetSum) {
      this.extendWindow();
    }
    if (currentSum >= this.targetSum) {
      this.shrinkWindow();
    }
  }

  private extendWindow(): void {
    const nextNumber = this.numbers.at(
      this.window.startPointer + this.window.size,
    );
    if (nextNumber === undefined) return;

    this.window = {
      ...this.window,
      size: this.window.size + 1,
      sum: this.window.sum + nextNumber,
    };
  }

  private shrinkWindow(): void {
    const firstNumberOfWindow = this.numbers.at(this.window.startPointer);
    if (firstNumberOfWindow === undefined) return;

    this.window = {
      ...this.window,
      size: this.window.size - 1,
      startPointer: this.window.startPointer + 1,
      sum: this.window.sum - firstNumberOfWindow,
    };
  }
}
