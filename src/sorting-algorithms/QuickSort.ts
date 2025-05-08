export class QuickSort {
  public sortNumbers({
    numbers,
    compareFunction = (left, right) => left - right,
  }: {
    numbers: number[];
    compareFunction?: (left: number, right: number) => number;
  }): number[] {
    return new QuickSorter({ collection: numbers, compareFunction })
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
    return new QuickSorter({ collection, compareFunction })
      .sortCollection()
      .getCollection();
  }
}

class QuickSorter<T> {
  private collection: T[];
  private compareFunction: (a: T, b: T) => number;
  constructor({
    collection,
    compareFunction,
    mutateCollection = false,
  }: {
    collection: T[];
    compareFunction: (a: T, b: T) => number;
    mutateCollection?: boolean;
  }) {
    this.collection = mutateCollection ? collection : collection.slice();
    this.compareFunction = compareFunction;
  }

  public getCollection(): T[] {
    return this.collection;
  }

  public sortCollection(
    startIndex = 0,
    endIndex = this.collection.length - 1,
  ): this {
    if (endIndex - startIndex < 1) return this;

    const pivotIndex = this.findPivotIndexAndArrange(startIndex, endIndex);
    this.sortCollection(startIndex, pivotIndex - 1);
    this.sortCollection(pivotIndex + 1, endIndex);

    return this;
  }

  public findPivotIndexAndArrange(
    startIndex: number,
    endIndex: number,
  ): number {
    const pivotItem = this.collection[startIndex];
    let smallerItemCount = 0;
    for (
      let currentIndex = startIndex + 1;
      currentIndex <= endIndex;
      currentIndex++
    ) {
      const currentItem = this.collection[currentIndex];
      const isCurrentItemSmaller =
        this.compareFunction(currentItem, pivotItem) < 0;
      if (isCurrentItemSmaller) {
        const startIndexOfTheBiggerArray = startIndex + smallerItemCount + 1;

        smallerItemCount++;
        this.swap(startIndexOfTheBiggerArray, currentIndex);
      }
    }

    const pivotIndex = startIndex + smallerItemCount;
    this.swap(startIndex, pivotIndex);

    console.log(this.collection.join(' '));
    console.log('===end===');

    return pivotIndex;
  }

  private swap(leftIndex: number, rightIndex: number): void {
    const leftItem = this.collection[leftIndex];
    const rightItem = this.collection[rightIndex];

    this.collection[leftIndex] = rightItem;
    this.collection[rightIndex] = leftItem;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function pivot(
  collection: number[],
  compareFunction?: (a: number, b: number) => number,
  start?: number,
  end?: number,
) {
  return new QuickSorter({
    collection,
    compareFunction: compareFunction ?? ((a, b) => a - b),
    mutateCollection: true,
  }).findPivotIndexAndArrange(start ?? 0, end ?? collection.length - 1);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function quickSort(
  collection: number[],
  compareFunction?: (a: number, b: number) => number,
) {
  return new QuickSorter({
    collection,
    compareFunction: compareFunction ?? ((a, b) => a - b),
    mutateCollection: true,
  })
    .sortCollection()
    .getCollection();
}
