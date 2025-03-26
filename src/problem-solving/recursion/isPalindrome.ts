export function isPalindrome(input: string): boolean {
  if (input.length < 2) return true;

  const firstCharacter = input.at(0);
  const lastCharacter = input.at(-1);
  const restString = input.slice(1, input.length - 1);
  if (firstCharacter === undefined || lastCharacter === undefined)
    throw new Error('??');

  const areCharactersEqual = firstCharacter === lastCharacter;
  return areCharactersEqual && isPalindrome(restString);
}
