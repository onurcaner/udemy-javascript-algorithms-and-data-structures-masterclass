export class BubbleSort {
  public sortNumbers(
    numbers: number[],
    compareFunction = (left: number, right: number) => left - right,
  ): number[] {
    return new BubbleSorter<number>({ collection: numbers, compareFunction })
      .sortCollection()
      .getCollection();
  }

  public sort<T>({
    collection,
    compareFunction,
  }: {
    collection: T[];
    compareFunction: (left: T, right: T) => number;
  }): T[] {
    return new BubbleSorter<T>({ collection, compareFunction })
      .sortCollection()
      .getCollection();
  }
}

class BubbleSorter<T = number> {
  private collection: T[];
  private compareFunction: (left: T, right: T) => number;
  constructor({
    collection,
    compareFunction,
  }: {
    collection: T[];
    compareFunction: (left: T, right: T) => number;
  }) {
    this.collection = collection.slice();
    this.compareFunction = compareFunction;
  }

  public sortCollection(): this {
    for (
      let iterationCount = 1;
      iterationCount < this.collection.length;
      iterationCount++
    ) {
      for (
        let leftIndex = 0;
        leftIndex < this.collection.length - iterationCount;
        leftIndex++
      ) {
        const left = this.collection[leftIndex];
        const right = this.collection[leftIndex + 1];
        const comparisonResult = this.compareFunction(left, right);

        if (comparisonResult > 0) {
          this.collection[leftIndex] = right;
          this.collection[leftIndex + 1] = left;
        }
      }
    }

    return this;
  }

  public getCollection() {
    return this.collection;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function bubbleSort(
  collection: number[],
  compareFunction = (left: number, right: number) => left - right,
): number[] {
  return new BubbleSort().sort({ collection, compareFunction });
}
