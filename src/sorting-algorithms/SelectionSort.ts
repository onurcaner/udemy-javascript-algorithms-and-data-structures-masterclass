export class SelectionSort {
  public sortNumbers({
    numbers,
    compareFunction = (left, right) => left - right,
  }: {
    numbers: number[];
    compareFunction?: (left: number, right: number) => number;
  }): number[] {
    return new SelectionSorter({ collection: numbers, compareFunction })
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
    return new SelectionSorter({ collection, compareFunction })
      .sortCollection()
      .getCollection();
  }
}

class SelectionSorter<T = number> {
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

  public getCollection(): T[] {
    return this.collection;
  }

  public sortCollection(): this {
    for (let leftIndex = 0; leftIndex < this.collection.length; leftIndex++) {
      const leftValue = this.collection[leftIndex];
      let smallestValue = this.collection[leftIndex];
      let indexOfSmallestValue = leftIndex;

      for (
        let rightIndex = leftIndex + 1;
        rightIndex < this.collection.length;
        rightIndex++
      ) {
        const rightValue = this.collection[rightIndex];

        const comparisonResult = this.compareFunction(
          smallestValue,
          rightValue,
        );
        if (comparisonResult > 0) {
          smallestValue = rightValue;
          indexOfSmallestValue = rightIndex;
        }
      }

      this.collection[leftIndex] = smallestValue;
      this.collection[indexOfSmallestValue] = leftValue;
    }

    return this;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function selectionSort(
  numbers: number[],
  compareFunction?: (a: number, b: number) => number,
): number[] {
  return new SelectionSort().sortNumbers({ numbers, compareFunction });
}
