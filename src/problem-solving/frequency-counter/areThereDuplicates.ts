export function areThereDuplicates(...inputs: unknown[]): boolean {
  if (inputs.length < 2) return false;

  const inputFrequencyMap = new Map<unknown, number>();
  inputs.forEach((input) => {
    const frequency = inputFrequencyMap.get(input);
    if (!frequency) inputFrequencyMap.set(input, 1);
    if (frequency) inputFrequencyMap.set(input, frequency + 1);
  });

  const frequencies = [...inputFrequencyMap.values()];
  const hasDuplicates = frequencies.some((frequency) => frequency > 1);

  return hasDuplicates;
}
