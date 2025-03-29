export function linearSearch<T = unknown>(values: T[], searchValue: T): number {
  try {
    values.forEach((value, i) => {
      if (value === searchValue) throw new BreakError(i.toString());
    });
  } catch (error) {
    if (error instanceof BreakError) return Number(error.message);
    else throw error;
  }

  return -1;
}

class BreakError extends Error {}
