class SinglyLinkedListNode<T> {
  public next: SinglyLinkedListNode<T> | null = null;
  constructor(public value: T) {}

  public get val(): T {
    return this.value;
  }

  public set val(val: T) {
    this.value = val;
  }
}

export class SinglyLinkedList<T> {
  public head: SinglyLinkedListNode<T> | null = null;
  public tail: SinglyLinkedListNode<T> | null = null;
  public length = 0;

  public static createNode<T>(value: T): SinglyLinkedListNode<T> {
    return new SinglyLinkedListNode(value);
  }

  public push(value: T): this {
    const newNode = SinglyLinkedList.createNode(value);
    const oldTail = this.tail;
    if (oldTail !== null) {
      oldTail.next = newNode;
    }

    this.head = this.head ?? newNode;
    this.tail = newNode;
    this.length++;

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

    newTail.next = null;
    this.tail = newTail;
    this.length--;

    return oldTail;
  }

  public shift(): SinglyLinkedListNode<T> | undefined {
    const oldHead = this.head;

    // length === 0
    if (!oldHead) return undefined;

    // length === 1
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.length = 0;

      return oldHead;
    }

    //length > 1
    const newHead = oldHead.next;
    if (!newHead)
      throw new Error(
        'SinglyLinkedList.prototype.head.prototype.next can not be null',
      );

    oldHead.next = null;
    this.head = newHead;
    this.length--;

    return oldHead;
  }

  public unshift(value: T): this {
    const newNode = SinglyLinkedList.createNode(value);
    const oldHead = this.head;
    newNode.next = oldHead;

    this.head = newNode;
    this.tail = this.tail ?? newNode;
    this.length++;

    return this;
  }

  public set(at: number, value: T): boolean {
    const node = this.get(at);
    if (!node) return false;

    node.value = value;
    return true;
  }

  public insert(at: number, value: T): boolean {
    if (at < 0 || at > this.length) return false;

    if (at === 0) {
      this.unshift(value);
      return true;
    }

    if (at === this.length) {
      this.push(value);
      return true;
    }

    const newNode = SinglyLinkedList.createNode(value);
    const previousNode = this.get(at - 1);
    if (!previousNode) throw new Error('previousNode can not be null');
    const nextNode = previousNode.next;

    previousNode.next = newNode;
    newNode.next = nextNode;
    this.length++;

    return true;
  }

  public remove(at: number): SinglyLinkedListNode<T> | undefined {
    if (at < 0 || at > this.length - 1) return undefined;
    if (at === 0) return this.shift();
    if (at === this.length - 1) return this.pop();

    const previousNode = this.get(at - 1);
    if (!previousNode) throw new Error('previousNode can not be null');
    const removedNode = previousNode.next;
    if (!removedNode) throw new Error('removedNode can not be null');
    const nextNode = removedNode.next;

    previousNode.next = nextNode;
    this.length--;

    return removedNode;
  }

  public reverse(): this {
    const previousHead = this.head;
    const previousTail = this.tail;

    let previousNode: typeof this.head = null;
    let currentNode: typeof this.head = this.head;
    Array.from({ length: this.length }).forEach(() => {
      if (!currentNode) return;

      const nextNode = currentNode.next;

      currentNode.next = previousNode;
      [previousNode, currentNode] = [currentNode, nextNode];
    });

    this.head = previousTail;
    this.tail = previousHead;

    return this;
  }

  public rotate(rotateAmount: number): this {
    const actualRotateAmount = (rotateAmount + this.length) % this.length;

    Array.from({ length: actualRotateAmount }).forEach(() => {
      const shiftedNode = this.shift();
      if (!shiftedNode) throw new Error('shiftedNode can not be null');

      this.push(shiftedNode.value);
    });

    return this;
  }
}
