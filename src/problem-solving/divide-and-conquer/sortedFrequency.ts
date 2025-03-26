export function sortedFrequency(
  sortedNumbers: number[],
  target: number,
): number {
  const frequency = new SortedFrequency(sortedNumbers, target).execute();
  return frequency || -1;
}

class SortedFrequency {
  constructor(
    private numbers: number[],
    private targetNumber: number,
  ) {}

  execute(): number {
    try {
      Array.from({ length: this.numbers.length }).forEach(
        this.handleForEach.bind(this),
      );
    } catch (error) {
      if (!(error instanceof BreakError)) throw error;
    }

    return this.numbers.length;
  }

  private handleForEach(): void {
    // check numbers collection
    if (this.numbers.length === 0) throw new BreakError();

    const middleIndex = Math.floor(this.numbers.length / 2);
    const middleNumber = this.numbers.at(middleIndex);
    if (middleNumber === undefined) throw new Error('???');

    // cut left
    if (middleNumber > this.targetNumber) {
      this.numbers = this.numbers.slice(0, middleIndex);
    }
    // cut right
    if (middleNumber < this.targetNumber) {
      this.numbers = this.numbers.slice(middleIndex + 1);
    }
    // divide
    if (middleNumber === this.targetNumber) {
      const leftNumbers = this.numbers.slice(0, middleIndex);
      const rightNumbers = this.numbers.slice(middleIndex + 1);

      const leftFrequency = new SortedFrequency(
        leftNumbers,
        this.targetNumber,
      ).execute();
      const rightFrequency = new SortedFrequency(
        rightNumbers,
        this.targetNumber,
      ).execute();

      this.numbers = Array.from({
        length: 1 + leftFrequency + rightFrequency,
      }).map(() => this.targetNumber);
      throw new BreakError();
    }
  }
}

class BreakError extends Error {}
