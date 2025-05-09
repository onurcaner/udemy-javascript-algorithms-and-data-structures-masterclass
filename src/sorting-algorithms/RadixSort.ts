export class RadixSort {
  public sortNumbers(numbers: number[]): number[] {
    return new RadixSorter(numbers).sortNumbers().getNumbers();
  }
}

class RadixSorter {
  private numbers: number[];
  private mostDigitCount: number;
  constructor(numbers: number[]) {
    this.numbers = numbers.slice();
    this.mostDigitCount = this.calculateMostDigitCount(numbers);
  }

  public getMostDigitCount(): number {
    return this.mostDigitCount;
  }

  public getNumbers(): number[] {
    return this.numbers;
  }

  public sortNumbers(): this {
    Array.from({ length: this.mostDigitCount })
      .map((_value, index) => index)
      .forEach((exponent) => {
        const buckets = Array.from({ length: 10 }).map((): number[] => []);

        this.numbers.forEach((number) => {
          const digit = this.getDigit(number, exponent);
          buckets[digit].push(number);
        });

        /* this.numbers = buckets.flat(1); */
        this.numbers = buckets.reduce(
          (numbers, bucket) => [...numbers, ...bucket],
          [],
        );
      });

    return this;
  }

  public getDigit(number: number, atExponent: number): number {
    const digits = this.getDigits(number);
    const digit = digits[atExponent] ?? 0;
    return digit;
  }

  public getDigitCount(number: number): number {
    return this.getDigits(number).length;
  }

  private calculateMostDigitCount(numbers: readonly number[]): number {
    if (numbers.length === 0) return 0;

    const digitCounts = numbers.map((number) => this.getDigitCount(number));
    const mostDigitCount = Math.max(...digitCounts);
    return mostDigitCount;
  }

  private getDigits(number: number): number[] {
    const digits = Math.abs(number)
      .toString()
      .split('')
      .reverse()
      .map((value) => Number(value));
    return digits;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getDigit(num: number, i: number): number {
  return new RadixSorter([]).getDigit(num, i);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function digitCount(num: number): number {
  return new RadixSorter([]).getDigitCount(num);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mostDigits(nums: number[]): number {
  return new RadixSorter(nums).getMostDigitCount();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function radixSort(nums: number[]): number[] {
  return new RadixSort().sortNumbers(nums);
}
