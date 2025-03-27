export function nestedEvenSum(input: object): number {
  return new NestedEvenSum(input).execute();
}

class NestedEvenSum {
  private values: unknown[];
  constructor(object: object) {
    this.values = Object.values(object);
  }

  private buildNewInstance(object: object): NestedEvenSum {
    return new NestedEvenSum(object);
  }

  execute(): number {
    if (this.values.length === 0) return 0;

    const [firstValue, ...restValues] = this.values;
    const number = this.evaluateOne(firstValue);

    return number + this.buildNewInstance(restValues).execute();
  }

  evaluateOne(input: unknown): number {
    if (!input) return 0;
    if (typeof input === 'number') return input % 2 === 0 ? input : 0;
    if (typeof input === 'object')
      return this.buildNewInstance(input).execute();
    return 0;
  }
}
