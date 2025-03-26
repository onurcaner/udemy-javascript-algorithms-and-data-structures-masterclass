export function productOfArray(numbers: number[]): number {
  if (numbers.length === 0) return NaN;

  const result = productOfArrayHelper(numbers);
  return result;
}

export function productOfArrayHelper(numbers: number[]): number {
  const number = numbers.at(0);
  if (number === undefined) return 1;

  const result = number * productOfArrayHelper(numbers.slice(1));
  return result;
}
