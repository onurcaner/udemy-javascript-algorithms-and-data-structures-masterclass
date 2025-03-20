export function sameFrequency(first: number, second: number): boolean {
  const firstFrequencyMap = createNumberFrequencyMap(first);
  const secondFrequencyMap = createNumberFrequencyMap(second);

  const unmatchedCount = first
    .toString()
    .split('')
    .map((digit) => firstFrequencyMap[digit] === secondFrequencyMap[digit])
    .filter((bool) => !bool).length;

  return unmatchedCount === 0;
}

function createNumberFrequencyMap(input: number): Record<string, number> {
  const digits = input.toString().split('');

  const numberFrequencyMap: Record<string, number> = {};
  digits.forEach((digit) => {
    numberFrequencyMap[digit] = (numberFrequencyMap[digit] ?? 0) + 1;
  });
  return numberFrequencyMap;
}
