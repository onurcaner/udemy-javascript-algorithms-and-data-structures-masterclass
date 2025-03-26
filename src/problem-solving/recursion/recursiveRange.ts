export function recursiveRange(number: number): number {
  if (number < 0) throw new Error('Non-negative number only');
  if (number % 1 !== 0) throw new Error('Integer number only');

  const result = recursiveRangeHelper(number);
  return result;
}

export function recursiveRangeHelper(number: number): number {
  if (number === 0) return 0;

  const result = number + recursiveRangeHelper(number - 1);
  return result;
}
