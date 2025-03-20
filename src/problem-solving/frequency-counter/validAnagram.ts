export function validAnagram(first: string, second: string): boolean {
  if (first.length !== second.length) return false;

  const firstCharacterCountMap = createCharacterCountMap(first);
  const secondCharacterCountMap = createCharacterCountMap(second);

  const unmatchedCount = Object.keys(firstCharacterCountMap)
    .map(
      (c): boolean => firstCharacterCountMap[c] === secondCharacterCountMap[c],
    )
    .filter((bool) => !bool).length;

  return unmatchedCount === 0;
}

function createCharacterCountMap(input: string): Record<string, number> {
  const stringCharacterCounts: Record<string, number> = {};
  input.split('').forEach((c) => {
    stringCharacterCounts[c] = (stringCharacterCounts[c] ?? 0) + 1;
  });

  return stringCharacterCounts;
}
