class SinglyLinkedListNode<T> {
  next: SinglyLinkedListNode<T> | null = null;
  constructor(public value: T) {}

  public get val(): T {
    return this.value;
  }

  public set val(val: T) {
    this.value = val;
  }
}

export class SinglyLinkedList<T> {
  head: SinglyLinkedListNode<T> | null = null;
  tail: SinglyLinkedListNode<T> | null = null;
  length = 0;

  public static createNode<T>(value: T): SinglyLinkedListNode<T> {
    return new SinglyLinkedListNode(value);
  }

  public push(value: T): this {
    const newNode = SinglyLinkedList.createNode(value);
    const oldTail = this.tail;

    this.head = this.head ?? newNode;
    this.tail = newNode;
    this.length++;
    if (oldTail !== null) {
      oldTail.next = newNode;
    }

    return this;
  }

  public get(at: number): SinglyLinkedListNode<T> | null {
    let currentNode: SinglyLinkedListNode<T> | null = this.head;
    for (let index = 1; index <= at; index++) {
      if (!currentNode) break;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  public pop(): SinglyLinkedListNode<T> | undefined {
    const oldTail = this.tail;

    // length === 0
    if (!oldTail) return undefined;

    // length === 1
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;

      return oldTail;
    }

    //length > 1
    const newTail = this.get(this.length - 2);
    if (!newTail)
      throw new Error(
        'SinglyLinkedList.prototype.length is greater than actual length',
      );

    this.tail = newTail;
    this.length--;

    return oldTail;
  }
}
