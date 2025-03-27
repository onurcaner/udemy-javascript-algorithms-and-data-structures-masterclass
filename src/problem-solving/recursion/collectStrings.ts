export function collectStrings(object: object): string[] {
  return new CollectStrings(object).execute();
}

class CollectStrings {
  constructor(private object: object) {}

  private buildNewInstance(object: object): CollectStrings {
    return new CollectStrings(object);
  }

  execute(): string[] {
    const values: unknown[] = Object.values(this.object);
    if (values.length === 0) return [];

    const [firstValue, ...restValues] = values;
    const result = [
      ...this.evaluateValue(firstValue),
      ...this.buildNewInstance(restValues).execute(),
    ];
    return result;
  }

  private evaluateValue(value: unknown): string[] {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    if (typeof value === 'object')
      return this.buildNewInstance(value).execute();
    return [];
  }
}
