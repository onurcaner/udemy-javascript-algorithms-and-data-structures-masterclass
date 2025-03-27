/**
 * function name is weird, it uppercases every word
 */
export function capitalizeWords(words: string[]): string[] {
  if (words.length === 0) return [];

  const [firstString, ...restStrings] = words;
  const result = [capitalizeWord(firstString), ...capitalizeWords(restStrings)];

  return result;
}

function capitalizeWord(word: string): string {
  if (word.length === 0) return '';

  const firstLetter = word.slice(0, 1);
  const restLetters = word.slice(1);
  const result = firstLetter.toUpperCase() + capitalizeWord(restLetters);

  return result;
}
