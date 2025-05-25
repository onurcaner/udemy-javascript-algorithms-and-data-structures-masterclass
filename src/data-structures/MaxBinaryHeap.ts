/* Array.prototype.at = function (index) {
  if (index >= this.length) return undefined;

  let realIndex = index;
  while (realIndex < 0) {
    realIndex += this.length;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return this[realIndex];
}; */

export class MaxBinaryHeap {
  private heap: number[] = [];

  public get values(): number[] {
    return this.heap;
  }

  public insert(value: number): this {
    this.heap.push(value);
    this.bubbleUp();
    return this;
  }

  private bubbleUp(): this {
    for (let currentIndex = this.heap.length - 1; currentIndex > 0; ) {
      const parentIndex = this.getParentIndex(currentIndex);
      const currentValue = this.heap.at(currentIndex);
      const parentValue = this.heap.at(parentIndex);
      if (currentValue === undefined || parentValue === undefined) break;

      if (currentValue <= parentValue) break;

      [this.heap[currentIndex], this.heap[parentIndex], currentIndex] = [
        parentValue,
        currentValue,
        parentIndex,
      ];
    }

    return this;
  }

  public extractMax(): number | undefined {
    const maxValue = this.heap.at(0);
    if (maxValue === undefined) return maxValue;

    const lastValue = this.heap.pop();
    if (lastValue === undefined) throw new Error();
    if (this.heap.length === 0) return lastValue;

    this.heap[0] = lastValue;
    this.bubbleDown();

    return maxValue;
  }

  private bubbleDown(): this {
    for (let currentIndex = 0; currentIndex < this.heap.length; ) {
      const currentValue = this.heap.at(currentIndex);
      if (currentValue === undefined) break;

      const [leftChildIndex, rightChildIndex] =
        this.getChildrenIndex(currentIndex);
      const leftChildValue = this.heap.at(leftChildIndex) ?? -Infinity;
      const rightChildValue = this.heap.at(rightChildIndex) ?? -Infinity;

      const isSwapping =
        leftChildValue > currentValue || rightChildValue > currentValue;
      if (!isSwapping) break;

      const swapDirection: 'left' | 'right' =
        rightChildValue > leftChildValue ? 'right' : 'left';
      if (swapDirection === 'right') {
        [this.heap[currentIndex], this.heap[rightChildIndex], currentIndex] = [
          rightChildValue,
          currentValue,
          rightChildIndex,
        ];
      }
      if (swapDirection === 'left') {
        [this.heap[currentIndex], this.heap[leftChildIndex], currentIndex] = [
          leftChildValue,
          currentValue,
          leftChildIndex,
        ];
      }
    }

    return this;
  }

  private getParentIndex(currentIndex: number): number {
    return Math.floor((currentIndex - 1) / 2);
  }

  private getChildrenIndex(currentIndex: number): [number, number] {
    const leftChildIndex = 2 * currentIndex + 1;
    const rightChildIndex = 2 * currentIndex + 2;
    return [leftChildIndex, rightChildIndex];
  }
}
