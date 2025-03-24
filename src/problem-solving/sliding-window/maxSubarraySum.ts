export function maxSubarraySum(
  numbers: number[],
  subarraySize: number,
): number | null {
  return new MaxSubarraySum(numbers, subarraySize).execute();
}

class MaxSubarraySum {
  private windowStartPointer = 0;
  private currentWindowSum = -Infinity;
  private maxSubarraySum = -Infinity;
  constructor(
    private numbers: number[],
    private subarraySize: number,
  ) {}

  execute(): number | null {
    if (this.numbers.length === 0) return null;
    if (this.subarraySize > this.numbers.length) return null;

    this.maxSubarraySum = this.sumFirstTime();
    this.currentWindowSum = this.maxSubarraySum;

    this.numbers.forEach(this.handleForEach.bind(this));

    return this.maxSubarraySum;
  }

  private sumFirstTime(): number {
    const sum = this.numbers
      .slice(0, this.subarraySize)
      .reduce((sum, number) => sum + number, 0);
    return sum;
  }

  private handleForEach(
    firstNumberOfWindow: number,
    windowStartIndex: number,
  ): void {
    const nextNumberOfWindow = this.numbers.at(
      windowStartIndex + this.subarraySize,
    );
    if (nextNumberOfWindow === undefined) return;

    const nextWindowSum =
      this.currentWindowSum - firstNumberOfWindow + nextNumberOfWindow;
    if (nextWindowSum > this.maxSubarraySum) {
      this.maxSubarraySum = nextWindowSum;
    }

    this.currentWindowSum = nextWindowSum;
  }
}
