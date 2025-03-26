export function factorial(number: number): number {
  if (number < 0) throw new Error('Non-negative number only');
  if (number % 1 !== 0) throw new Error('Integer number only');

  const result = factorialHelper(number);
  return result;
}

function factorialHelper(number: number): number {
  if (number === 0) return 1;

  const result = number * factorial(number - 1);
  return result;
}
