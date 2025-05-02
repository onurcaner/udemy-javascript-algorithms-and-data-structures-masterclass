/**
 * @param sortedBinaries [1,1,1,1,0,0,0]
 */
export function countZeroes(sortedBinaries: number[]): number {
  return new CountZeroes(sortedBinaries).execute();
}

class CountZeroes {
  private loopCount = 0;
  private zeroCount = 0;

  constructor(private binaries: number[]) {}

  execute(): number {
    try {
      Array.from({ length: this.binaries.length }).forEach(
        this.handleForEach.bind(this),
      );
    } catch (error: unknown) {
      if (!(error instanceof BreakError)) throw error;
    }

    return this.zeroCount;
  }

  private handleForEach(): void {
    this.loopCount++;

    // check binary size
    if (this.binaries.length === 0) throw new BreakError();

    const middleIndex = Math.floor(this.binaries.length / 2);
    const middleBinary = this.binaries.at(middleIndex);
    if (middleBinary === undefined) throw new Error('ERROR');

    if (middleBinary === 0) {
      const remainingBinaries = this.binaries.slice(0, middleIndex);
      const rightZeros = this.binaries.slice(middleIndex);

      this.zeroCount += rightZeros.length;
      this.binaries = remainingBinaries;
    }

    if (middleBinary === 1) {
      // const leftOnes = this.binaries.slice(0, middleIndex + 1);
      const remainingBinaries = this.binaries.slice(middleIndex + 1);

      this.binaries = remainingBinaries;
    }
  }
}

class BreakError extends Error {}
