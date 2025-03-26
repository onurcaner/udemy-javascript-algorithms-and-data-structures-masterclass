export function reverse(input: string): string {
  if (input.length === 0) return '';

  const lastCharacter = input.at(-1);
  const restString = input.slice(0, input.length - 1);
  if (lastCharacter === undefined) throw new Error('???');

  return lastCharacter + reverse(restString);
}
