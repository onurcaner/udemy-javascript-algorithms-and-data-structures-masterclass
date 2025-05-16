import { Queue } from './Queue';

export class StackWithTwoQueues<T> {
  private filledQueue = new Queue<T>();
  private emptyQueue = new Queue<T>();

  public get size(): number {
    return this.filledQueue.size;
  }

  public push(value: T): this {
    this.emptyQueue.enqueue(value);

    Array.from({ length: this.filledQueue.size }).forEach(() => {
      const value = this.filledQueue.dequeue();
      if (value === null) return;
      this.emptyQueue.enqueue(value);
    });

    [this.emptyQueue, this.filledQueue] = [this.filledQueue, this.emptyQueue];

    return this;
  }

  public pop(): T | null {
    return this.filledQueue.dequeue();
  }
}

/* class Stack<T> extends StackWithTwoQueues<T> {}

class QueueNode<T> {
  public next: QueueNode<T> | null = null;
  constructor(public value: T) {}
}

class Queue<T> {
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
} */
