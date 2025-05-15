class QueueNode<T> {
  public next: QueueNode<T> | null = null;
  constructor(public value: T) {}
}

export class Queue<T> {
  public first: QueueNode<T> | null = null;
  public last: QueueNode<T> | null = null;
  public size = 0;

  public static createNode<T>(value: T): QueueNode<T> {
    return new QueueNode(value);
  }

  public enqueue(value: T): number {
    const newNode = Queue.createNode(value);
    const oldLastNode = this.last;

    if (oldLastNode) oldLastNode.next = newNode;
    this.first ??= newNode;
    this.last = newNode;
    this.size++;

    return this.size;
  }

  public dequeue(): T | null {
    const firstNode = this.first;

    // size === 0
    if (!firstNode) return null;

    // size === 1
    if (!firstNode.next) {
      this.first = null;
      this.last = null;
      this.size = 0;

      return firstNode.value;
    }

    // size > 1
    const secondNode = firstNode.next;

    firstNode.next = null;
    this.first = secondNode;
    this.size--;

    return firstNode.value;
  }
}
