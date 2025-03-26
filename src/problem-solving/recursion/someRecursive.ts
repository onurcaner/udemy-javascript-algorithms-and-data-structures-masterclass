export function someRecursive<T>(
  items: T[],
  callbackFunction: (item: T) => boolean,
): boolean {
  if (items.length === 0) return false;

  const [item, ...restItems] = items;
  const result =
    callbackFunction(item) || someRecursive(restItems, callbackFunction);
  return result;
}
