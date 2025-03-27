export function stringifyNumbers(object: Readonly<object>): object {
  return new StringifyNumbers(object).execute();
}

class StringifyNumbers {
  constructor(private object: Readonly<object>) {}

  private buildNewInstance(object: Readonly<object>): StringifyNumbers {
    return new StringifyNumbers(object);
  }

  execute(): object {
    const entries = Object.entries(this.object);
    const newEntries = this.evaluateEntries(entries);
    const result = Object.fromEntries(newEntries);

    return result;
  }

  private evaluateEntries(entries: [string, unknown][]): [string, unknown][] {
    if (entries.length === 0) return [];

    const [firstEntry, ...restEntries] = entries;
    const result = [
      this.evaluateEntry(firstEntry),
      ...this.evaluateEntries(restEntries),
    ];

    return result;
  }

  private evaluateEntry([key, value]: [string, unknown]): [string, unknown] {
    if (!value) {
      return [key, value];
    }
    if (typeof value === 'number') {
      return [key, value.toString()];
    }
    if (value instanceof Array) {
      return [key, Object.values(this.buildNewInstance(value).execute())];
    }
    if (typeof value === 'object') {
      return [key, this.buildNewInstance(value).execute()];
    }
    return [key, value];
  }
}
