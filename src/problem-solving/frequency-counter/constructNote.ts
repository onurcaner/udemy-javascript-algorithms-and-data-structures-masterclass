export function constructNote(message: string, letters: string): boolean {
  if (message.length === 0) return true;
  if (message.length === 1) return message === letters;

  const messageCountMap = createLetterCountMap(message);
  const lettersCountMap = createLetterCountMap(letters);

  const areLettersEnough = Object.keys(messageCountMap)
    .map(
      (letter): boolean => lettersCountMap[letter] >= messageCountMap[letter],
    )
    .every((bool) => bool);

  return areLettersEnough;
}

function createLetterCountMap(input: string): Record<string, number> {
  const letterCountMap: Record<string, number> = {};
  input.split('').forEach((letter) => {
    letterCountMap[letter] = (letterCountMap[letter] ?? 0) + 1;
  });
  return letterCountMap;
}
