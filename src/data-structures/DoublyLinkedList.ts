class DoublyLinkedListNode<T> {
  public previous: DoublyLinkedListNode<T> | null = null;
  public next: DoublyLinkedListNode<T> | null = null;
  constructor(public value: T) {}

  public get prev(): DoublyLinkedListNode<T> | null {
    return this.previous;
  }

  public set prev(node: DoublyLinkedListNode<T> | null) {
    this.prev = node;
  }

  public get val(): T {
    return this.value;
  }

  public set val(val: T) {
    this.value = val;
  }
}

export class DoublyLinkedList<T> {
  public head: DoublyLinkedListNode<T> | null = null;
  public tail: DoublyLinkedListNode<T> | null = null;
  public length = 0;

  public static createNode<T>(value: T): DoublyLinkedListNode<T> {
    return new DoublyLinkedListNode(value);
  }

  public push(value: T): this {
    const newNode = DoublyLinkedList.createNode(value);
    const oldTail = this.tail;

    if (oldTail) oldTail.next = newNode;
    newNode.previous = oldTail;

    this.head = this.head ?? newNode;
    this.tail = newNode;
    this.length++;

    return this;
  }

  public pop(): DoublyLinkedListNode<T> | undefined {
    const oldTail = this.tail;

    // length === 0
    if (!oldTail) return undefined;

    // length === 1
    if (this.head === this.tail) {
      oldTail.previous = null;
      this.head = null;
      this.tail = null;
      this.length = 0;

      return oldTail;
    }

    // length > 1
    const newTail = oldTail.previous;
    if (!newTail) throw new Error('newTail can not be null');

    oldTail.previous = null;
    this.tail = newTail;
    this.length--;

    return oldTail;
  }

  public shift(): DoublyLinkedListNode<T> | undefined {
    const oldHead = this.head;

    // length === 0
    if (!oldHead) return undefined;

    // length === 1
    if (this.head === this.tail) {
      oldHead.next = null;

      this.head = null;
      this.tail = null;
      this.length = 0;

      return oldHead;
    }

    // length > 1
    const newHead = oldHead.next;
    if (!newHead) throw new Error('newHead can not be null');

    oldHead.next = null;
    newHead.previous = null;
    this.head = newHead;
    this.length--;

    return oldHead;
  }

  public unshift(value: T): this {
    const newNode = DoublyLinkedList.createNode(value);
    const oldHead = this.head;

    if (oldHead) oldHead.previous = newNode;
    newNode.next = oldHead;

    this.head = newNode;
    this.tail = this.tail ?? newNode;
    this.length++;

    return this;
  }

  public get(at: number): DoublyLinkedListNode<T> | null {
    if (at < 0 || at >= this.length) return null;

    const isStartingFromHead = at / (this.length - 1) <= 0.5;
    if (isStartingFromHead) return this.getFromHead(at);
    else return this.getFromTail(at);
  }

  private getFromHead(at: number): DoublyLinkedListNode<T> | null {
    let currentNode: DoublyLinkedListNode<T> | null = this.head;
    for (let index = 1; index <= at; index++) {
      if (!currentNode) break;
      currentNode = currentNode.next;
    }

    return currentNode;
  }

  private getFromTail(at: number): DoublyLinkedListNode<T> | null {
    let currentNode: DoublyLinkedListNode<T> | null = this.tail;
    for (let index = this.length - 2; index >= at; index--) {
      if (!currentNode) break;
      currentNode = currentNode.previous;
    }

    return currentNode;
  }

  public set(at: number, value: T): boolean {
    if (at < 0 || at >= this.length) return false;

    const node = this.get(at);
    if (!node) throw new Error('.prototype.get() is implemented wrong');

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

    const newNode = DoublyLinkedList.createNode(value);
    const previousNode = this.get(at - 1);
    if (!previousNode) throw new Error('.prototype.get() is implemented wrong');
    const nextNode = previousNode.next;
    if (!nextNode) throw new Error('nextNode can not be null');

    [previousNode.next, newNode.previous] = [newNode, previousNode];
    [newNode.next, nextNode.previous] = [nextNode, newNode];
    this.length++;

    return true;
  }

  public remove(at: number): DoublyLinkedListNode<T> | undefined {
    if (at < 0 || at >= this.length) return undefined;
    if (at === 0) return this.shift();
    if (at === this.length - 1) return this.pop();

    const currentNode = this.get(at);
    if (!currentNode) throw new Error('.prototype.get() is implemented wrong');
    const [previousNode, nextNode] = [currentNode.previous, currentNode.next];
    if (!previousNode) throw new Error('previousNode can not be null');
    if (!nextNode) throw new Error('nextNode can not be null');

    [previousNode.next, nextNode.previous] = [nextNode, previousNode];
    this.length--;

    return currentNode;
  }

  public reverse(): this {
    const [previousHead, previousTail] = [this.head, this.tail];

    let currentNode = this.head;
    Array.from({ length: this.length }).forEach(() => {
      if (!currentNode) return;

      const nextNode = currentNode.next;

      [currentNode.previous, currentNode.next] = [
        currentNode.next,
        currentNode.previous,
      ];
      currentNode = nextNode;
    });

    [this.head, this.tail] = [previousTail, previousHead];

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
