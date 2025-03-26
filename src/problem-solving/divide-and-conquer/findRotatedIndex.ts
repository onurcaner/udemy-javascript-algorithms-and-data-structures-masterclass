/**
 * @param numbers [7,8,9,10,11,2,3,4]
 */
export function findRotatedIndex(
  numbers: number[],
  targetNumber: number,
): number {
  const firstNumber = numbers.at(0);
  if (firstNumber === undefined) return -1;
  if (firstNumber === targetNumber) return 0;

  const secondNumber = numbers.at(1);
  if (secondNumber === targetNumber) return 1;

  const smallestNumberIndex = new FindRotatedIndex(
    numbers,
    targetNumber,
  ).findSmallest();

  const sortedArray = [
    ...numbers.slice(smallestNumberIndex),
    ...numbers.slice(0, smallestNumberIndex),
  ];
  const targetNumberIndex = new FindRotatedIndex(
    sortedArray,
    targetNumber,
  ).findEqual();

  if (targetNumberIndex === -1) return -1;
  else return (smallestNumberIndex + targetNumberIndex) % numbers.length;
}

class FindRotatedIndex {
  private isSuccessful = false;
  private indexOffset = 0;
  constructor(
    private numbers: number[],
    private targetNumber: number,
  ) {}

  findSmallest(): number {
    return this.execute(this.findSmallestForEachHandler.bind(this));
  }

  findEqual(): number {
    return this.execute(this.findEqualForEachHandler.bind(this));
  }

  private execute(forEachHandler: () => void) {
    try {
      this.numbers.forEach(forEachHandler);
    } catch (error) {
      if (!(error instanceof BreakError)) throw error;
    }

    if (this.isSuccessful) return this.indexOffset;
    else return -1;
  }

  private findSmallestForEachHandler(): void {
    const firstNumber = this.numbers.at(0);
    const lastNumber = this.numbers.at(-1);
    if (firstNumber === undefined) throw new Error('?');
    if (lastNumber === undefined) throw new Error('?');

    if (firstNumber <= lastNumber) {
      this.numbers = [firstNumber];
      this.isSuccessful = true;
      throw new BreakError();
    }

    const middleIndex = Math.floor(this.numbers.length / 2);
    const middleNumber = this.numbers.at(middleIndex);
    if (middleNumber === undefined) throw new Error('?');

    // past breakpoint, certain
    if (firstNumber > middleNumber && this.numbers.length === 2) {
      this.numbers = this.numbers.slice(middleIndex);
      this.indexOffset++;
      return;
    }
    // past breakpoint, cautious
    if (firstNumber > middleNumber) {
      this.numbers = this.numbers.slice(0, middleIndex + 1);
      return;
    }
    // before breakpoint
    if (firstNumber <= middleNumber) {
      this.numbers = this.numbers.slice(middleIndex + 1);
      this.indexOffset += middleIndex + 1;
      return;
    }
  }

  private findEqualForEachHandler(): void {
    if (this.numbers.length < 1) throw new BreakError();

    if (this.numbers.length <= 2 && this.isSuccessful) {
      if (this.numbers[0] === this.targetNumber) throw new BreakError();
      this.indexOffset++;
      throw new BreakError();
    }

    const middleIndex = Math.floor(this.numbers.length / 2);
    const middleNumber = this.numbers.at(middleIndex);
    if (middleNumber === undefined) throw new Error('?');

    // past target, certain
    if (middleNumber > this.targetNumber) {
      this.numbers = this.numbers.slice(0, middleIndex);
      return;
    }
    // before target, certain
    if (middleNumber < this.targetNumber) {
      this.numbers = this.numbers.slice(middleIndex + 1);
      this.indexOffset += middleIndex + 1;
      return;
    }
    // currently on target, cautious
    if (middleNumber === this.targetNumber) {
      this.numbers = this.numbers.slice(0, middleIndex + 1);
      this.isSuccessful = true;
      return;
    }
  }
}

class BreakError extends Error {}
