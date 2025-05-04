export class MergeSort {
  public sortNumbers({
    numbers,
    compareFunction = (left, right) => left - right,
  }: {
    numbers: number[];
    compareFunction?: (left: number, right: number) => number;
  }): number[] {
    return new MergeSorter(compareFunction).sorted(numbers);
  }

  public sort<T>({
    collection,
    compareFunction,
  }: {
    collection: T[];
    compareFunction: (left: T, right: T) => number;
  }): T[] {
    return new MergeSorter(compareFunction).sorted(collection);
  }
}

class MergeSorter<T> {
  constructor(private compareFunction: (a: T, b: T) => number) {}

  public sorted(collection: T[]): T[] {
    if (collection.length <= 1) return collection;

    const middleIndex = Math.floor(collection.length / 2);
    const leftHalf = collection.slice(0, middleIndex);
    const rightHalf = collection.slice(middleIndex);

    const sortedLeftHalf = this.sorted(leftHalf);
    const sortedRightHalf = this.sorted(rightHalf);
    const sortedAndMerged = this.mergeSortedArrays(
      sortedLeftHalf,
      sortedRightHalf,
    );

    return sortedAndMerged;
  }

  public mergeSortedArrays(leftArray: T[], rightArray: T[]): T[] {
    const sorted: T[] = [];
    let leftIndex = 0;
    let rightIndex = 0;

    for (; leftIndex < leftArray.length && rightIndex < rightArray.length; ) {
      const leftItem = leftArray[leftIndex];
      const rightItem = rightArray[rightIndex];
      const isLeftLessOrEqual = this.compareFunction(leftItem, rightItem) <= 0;
      if (isLeftLessOrEqual) {
        leftIndex++;
        sorted.push(leftItem);
      } else {
        rightIndex++;
        sorted.push(rightItem);
      }
    }

    for (; leftIndex < leftArray.length; ) {
      const leftItem = leftArray[leftIndex];

      leftIndex++;
      sorted.push(leftItem);
    }

    for (; rightIndex < rightArray.length; ) {
      const rightItem = rightArray[rightIndex];

      rightIndex++;
      sorted.push(rightItem);
    }

    return sorted;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function merge(
  a: number[],
  b: number[],
  compareFunction?: (a: number, b: number) => number,
): number[] {
  const comparator: NonNullable<typeof compareFunction> =
    compareFunction ??
    function (l, r) {
      return l - r;
    };
  return new MergeSorter(comparator).mergeSortedArrays(a, b);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function mergeSort(
  collection: number[],
  compareFunction?: (a: number, b: number) => number,
): number[] {
  const comparator: NonNullable<typeof compareFunction> =
    compareFunction ??
    function (l, r) {
      return l - r;
    };
  return new MergeSorter(comparator).sorted(collection);
}
