export function fib(at: number): number {
  if (at <= 0) throw new Error('Positive input only');
  if (at % 1 !== 0) throw new Error('Integer input only');

  return new Fib().findAt(at);
}

class Fib {
  private sequenceMap = new Map<number, number>();
  private hasUpTo = 2;
  constructor() {
    this.sequenceMap.set(1, 1);
    this.sequenceMap.set(2, 1);
  }

  findAt(at: number): number {
    if (at > this.hasUpTo) {
      this.calculateUpTo(at);
    }

    const number = this.sequenceMap.get(at);
    if (number === undefined) throw new Error('?');

    return number;
  }

  private calculateUpTo(at: number): void {
    if (at <= this.hasUpTo) {
      return;
    }

    this.hasUpTo++;

    const previousTwoNumbers = [
      this.sequenceMap.get(this.hasUpTo - 2),
      this.sequenceMap.get(this.hasUpTo - 1),
    ];
    const number = previousTwoNumbers
      .filter((number) => number !== undefined)
      .reduce((sum, number) => sum + number, 0);
    this.sequenceMap.set(this.hasUpTo, number);

    this.calculateUpTo(at);
  }
}
