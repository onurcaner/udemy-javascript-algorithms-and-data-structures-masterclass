export function findPair(numbers: number[], difference: number): boolean {
  return new FindPair(numbers, difference).execute();
}

class FindPair {
  private numberCountMap = new Map<number, number>();
  private isPairFound = false;
  constructor(
    private numbers: number[],
    private difference: number,
  ) {
    this.mapNumberCount();
  }

  execute(): boolean {
    [...this.numberCountMap.keys()].forEach((number) => {
      if (this.isPairFound) return;

      // difference: 0
      if (this.difference === 0) {
        const numberCount = this.numberCountMap.get(number) ?? 0;
        if (numberCount > 1) {
          this.isPairFound = true;
        }
        return;
      }

      const possibleOtherNumbers = [
        this.numberCountMap.get(number + this.difference),
        this.numberCountMap.get(number - this.difference),
      ];

      const otherNumbers = possibleOtherNumbers.filter(
        (number) => typeof number === 'number',
      );
      if (otherNumbers.length === 0) return;

      this.isPairFound = true;
    });

    return this.isPairFound;
  }

  private mapNumberCount(): void {
    this.numbers.forEach((number) => {
      const currentCount = this.numberCountMap.get(number) ?? 0;
      this.numberCountMap.set(number, currentCount + 1);
    });
  }
}
