export function isSubsequence(first: string, second: string): boolean {
  return new IsSubsequence(first, second).execute();
}

class IsSubsequence {
  private firstPointer = 0;
  private secondPointer = 0;
  private foundCharacters: string[] = [];
  constructor(
    private first: string,
    private second: string,
  ) {}

  execute(): boolean {
    if (this.first.length === 0) return true;
    if (this.first.length > this.second.length) return false;

    this.second.split('').forEach(() => {
      const firstsCharacter = this.first.at(this.firstPointer);
      const secondsCharacter = this.second.at(this.secondPointer);
      if (!firstsCharacter || !secondsCharacter) return;

      if (firstsCharacter === secondsCharacter) {
        this.foundCharacters.push(firstsCharacter);
        this.firstPointer++;
        this.secondPointer++;
      } else {
        this.secondPointer++;
      }
    });

    if (this.foundCharacters.join('') === this.first) return true;
    else return false;
  }
}
