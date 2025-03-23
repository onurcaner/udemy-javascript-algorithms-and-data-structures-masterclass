export function countUniqueValues(sortedNumbers: number[]): number {
  const uniqueNumbers = sortedNumbers.filter((number, i, numbers) => {
    const nextNumber = numbers.at(i + 1);
    if (number !== nextNumber) return true;
    else return false;
  });

  return uniqueNumbers.length;
}
