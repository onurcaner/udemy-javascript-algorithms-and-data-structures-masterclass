export function findLongestSubstring(input: string): number {
  return new FindLongestSubstring(input).execute();
}

class FindLongestSubstring {
  private longestSubstringLength = 0;
  private characters: string[];
  private substringWindow = {
    size: 0,
    startPointer: 0,
    characterCountMap: new Map<string, number>(),
    duplicatedCharacter: null as string | null,
  };
  constructor(input: string) {
    this.characters = input.split('');
  }

  execute(): number {
    Array.from({ length: this.characters.length * 2 }).forEach(
      this.handleForEach.bind(this),
    );
    return this.longestSubstringLength;
  }

  private handleForEach(): void {
    const hasDuplications = this.substringWindow.duplicatedCharacter !== null;

    if (
      !hasDuplications &&
      this.substringWindow.size > this.longestSubstringLength
    ) {
      this.longestSubstringLength = this.substringWindow.size;
    }

    if (!hasDuplications) {
      this.extendWindow();
    }
    if (hasDuplications) {
      this.shrinkWindow();
    }
  }

  private extendWindow(): void {
    const nextCharacter = this.characters.at(
      this.substringWindow.startPointer + this.substringWindow.size,
    );
    if (nextCharacter === undefined) return;

    const { characterCountMap } = this.substringWindow;
    const newCount = (characterCountMap.get(nextCharacter) ?? 0) + 1;
    characterCountMap.set(nextCharacter, newCount);

    this.substringWindow = {
      ...this.substringWindow,
      size: this.substringWindow.size + 1,
      duplicatedCharacter: newCount > 1 ? nextCharacter : null,
    };
  }

  private shrinkWindow(): void {
    const firstCharacter = this.characters.at(
      this.substringWindow.startPointer,
    );
    if (firstCharacter === undefined) return;

    const { characterCountMap } = this.substringWindow;
    const newCount = (characterCountMap.get(firstCharacter) ?? 0) - 1;
    if (newCount === 0) {
      characterCountMap.delete(firstCharacter);
    } else {
      characterCountMap.set(firstCharacter, newCount);
    }

    this.substringWindow = {
      ...this.substringWindow,
      startPointer: this.substringWindow.startPointer + 1,
      size: this.substringWindow.size - 1,
      duplicatedCharacter:
        newCount === 0 ? this.substringWindow.duplicatedCharacter : null,
    };
  }
}
