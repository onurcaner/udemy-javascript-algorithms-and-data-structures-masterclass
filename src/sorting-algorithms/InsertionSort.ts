export class InsertionSort {
  public sortNumbers({
    numbers,
    compareFunction = (a, b) => a - b,
  }: {
    numbers: number[];
    compareFunction?: (a: number, b: number) => number;
  }): number[] {
    return new InsertionSorter({
      collection: numbers,
      compareFunction,
    })
      .sortCollection()
      .getCollection();
  }

  public sort<T>({
    collection,
    compareFunction,
  }: {
    collection: T[];
    compareFunction: (a: T, b: T) => number;
  }): T[] {
    return new InsertionSorter({ collection, compareFunction })
      .sortCollection()
      .getCollection();
  }
}

class InsertionSorter<T = number> {
  private collection: T[];
  private compareFunction: (a: T, b: T) => number;
  constructor({
    collection,
    compareFunction,
  }: {
    collection: T[];
    compareFunction: (a: T, b: T) => number;
  }) {
    this.collection = collection.slice();
    this.compareFunction = compareFunction;
  }

  public getCollection(): T[] {
    return this.collection;
  }

  public sortCollection(): this {
    for (
      let unsortedArrayStartIndex = 1;
      unsortedArrayStartIndex < this.collection.length;
      unsortedArrayStartIndex++
    ) {
      for (
        let rightIndex = unsortedArrayStartIndex;
        rightIndex >= 1;
        rightIndex--
      ) {
        const leftIndex = rightIndex - 1;
        const leftValue = this.collection[leftIndex];
        const rightValue = this.collection[rightIndex];
        const comparisonResult = this.compareFunction(leftValue, rightValue);
        if (comparisonResult <= 0) {
          break;
        }

        this.collection[leftIndex] = rightValue;
        this.collection[rightIndex] = leftValue;
      }
    }

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function insertionSort(
  numbers: number[],
  compareFunction?: (a: number, b: number) => number,
): number[] {
  return new InsertionSort().sortNumbers({ numbers, compareFunction });
}
