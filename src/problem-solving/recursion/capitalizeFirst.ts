/**
 * function name is weird, it capitalizes every word
 */
export function capitalizeFirst(strings: string[]): string[] {
  return new CapitalizeFirst(strings).execute();
}

class CapitalizeFirst {
  constructor(private strings: string[]) {}

  private buildNewInstance(strings: string[]) {
    return new CapitalizeFirst(strings);
  }

  execute(): string[] {
    if (this.strings.length === 0) return [];

    const [firstString, ...restString] = this.strings;

    const result = [
      this.capitalize(firstString),
      ...this.buildNewInstance(restString).execute(),
    ];
    return result;
  }

  private capitalize(string: string): string {
    if (string.length === 0) return string;
    if (string.length === 1) return string.toUpperCase();

    const firstLetter = string.slice(0, 1);
    const restString = string.slice(1);

    return firstLetter.toUpperCase() + restString;
  }
}
