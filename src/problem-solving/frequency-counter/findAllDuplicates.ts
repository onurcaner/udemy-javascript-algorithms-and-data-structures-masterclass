export function findAllDuplicates(numbers: number[]): number[] {
  if (numbers.length === 0) return [];
  if (numbers.length === 1) return [];

  const numberFrequencies = new Map<number, number>();
  numbers.forEach((number) => {
    const numberFrequency = numberFrequencies.get(number) ?? 0;
    numberFrequencies.set(number, numberFrequency + 1);
  });

  const duplicatedNumbers = [...numberFrequencies.entries()]
    .filter(([, frequency]) => frequency > 1)
    .map(([number]) => number);

  return duplicatedNumbers;
}
