export function power(base: number, exponent: number): number {
  if (exponent < 0) throw new Error('Non-negative exponent only');
  if (exponent % 1 !== 0) throw new Error('Integer exponent only');

  const result = powerHelper(base, exponent);
  return result;
}

function powerHelper(base: number, exponent: number): number {
  if (exponent === 0) return 1;

  const result = base * powerHelper(base, exponent - 1);
  return result;
}
