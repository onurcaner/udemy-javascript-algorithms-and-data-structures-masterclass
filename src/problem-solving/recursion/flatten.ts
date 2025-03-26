import { cloneDeep } from 'lodash';

export function flatten<T = unknown>(collection: T[]): T[] {
  return new Flatten(collection, true).execute();
}

class Flatten<T = unknown> {
  private collection: T[];
  constructor(collection: T[], isDeepCloning = false) {
    this.collection = isDeepCloning ? cloneDeep(collection) : collection;
  }

  execute(): T[] {
    if (this.collection.length === 0) return [];

    const [first, ...rest] = this.collection;

    const flatFirst =
      first instanceof Array ? new Flatten<T>(first).execute() : [first];
    const flatRest = new Flatten(rest).execute();

    return [...flatFirst, ...flatRest];
  }
}
