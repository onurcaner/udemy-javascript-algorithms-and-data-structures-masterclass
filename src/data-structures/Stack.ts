class StackNode<T> {
  public next: StackNode<T> | null = null;
  constructor(public value: T) {}
}

export class Stack<T> {
  public first: StackNode<T> | null = null;
  public last: StackNode<T> | null = null;
  public size = 0;

  public static createNode<T>(value: T): StackNode<T> {
    return new StackNode(value);
  }

  public push(value: T): number {
    const newNode = Stack.createNode(value);
    newNode.next = this.first;

    this.first = newNode;
    this.last ??= newNode;
    this.size++;

    return this.size;
  }

  public pop(): T | undefined {
    const firstNode = this.first;

    // size === 0
    if (!firstNode) return undefined;

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
