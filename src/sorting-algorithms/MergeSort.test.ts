import { describe, expect, test } from 'vitest';

import { MergeSort } from './MergeSort';

describe('MergeSort', () => {
  describe('number collection', () => {
    describe('input: empty array', () => {
      test('return empty array', () => {
        // Arrange
        const numbers: number[] = [];
        const expectedResult: number[] = [];

        // Act
        const actualResult = new MergeSort().sortNumbers({ numbers });

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      });
    });

    describe('input: array with only one item', () => {
      test.each([
        { numbers: [1], expectedResult: [1] },
        { numbers: [5], expectedResult: [5] },
        { numbers: [234213], expectedResult: [234213] },
      ])('numbers: $numbers', ({ expectedResult, numbers }) => {
        // Act
        const actualResult = new MergeSort().sortNumbers({ numbers });

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      });
    });

    describe('normal input without compareFunction', () => {
      test.each([
        { numbers: [1, 2, 2, 3, 3, 3], expectedResult: [1, 2, 2, 3, 3, 3] },
        { numbers: [3, 3, 3, 2, 2, 1], expectedResult: [1, 2, 2, 3, 3, 3] },
        { numbers: [2, 1, 3, 3, 2, 3], expectedResult: [1, 2, 2, 3, 3, 3] },
      ])(
        'numbers: $numbers, expectedResult: $expectedResult',
        ({ expectedResult, numbers }) => {
          // Act
          const actualResult = new MergeSort().sortNumbers({ numbers });

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });

    describe('normal input with compareFunction', () => {
      test.each([
        { numbers: [1, 2, 2, 3, 3, 3], expectedResult: [3, 3, 3, 2, 2, 1] },
        { numbers: [3, 3, 3, 2, 2, 1], expectedResult: [3, 3, 3, 2, 2, 1] },
        { numbers: [2, 1, 3, 3, 2, 3], expectedResult: [3, 3, 3, 2, 2, 1] },
      ])(
        'numbers: $numbers, expectedResult: $expectedResult',
        ({ expectedResult, numbers }) => {
          // Arrange
          const compareFunction: (a: number, b: number) => number = (a, b) => {
            return b - a;
          };

          // Act
          const actualResult = new MergeSort().sortNumbers({
            numbers,
            compareFunction,
          });

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });
  });

  describe('string collection', () => {
    describe('sort by alphabet', () => {
      const compareFunction = (a: string, b: string): number => {
        return a > b ? 1 : -1;
      };

      test.each([
        {
          collection: ['a', 'bb', 'ccc', 'dddd'],
          expectedResult: ['a', 'bb', 'ccc', 'dddd'],
        },
        {
          collection: ['dddd', 'a', 'ccc', 'bb'],
          expectedResult: ['a', 'bb', 'ccc', 'dddd'],
        },
      ])(
        'collection: $collection, expectedResult: $expectedResult',
        ({ collection, expectedResult }) => {
          // Act
          const actualResult = new MergeSort().sort({
            collection,
            compareFunction,
          });

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });

    describe('sort by length reversed', () => {
      const compareFunction = (a: string, b: string): number => {
        return b.length - a.length;
      };

      test.each([
        {
          collection: ['a', 'bb', 'ccc', 'dddd'],
          expectedResult: ['dddd', 'ccc', 'bb', 'a'],
        },
        {
          collection: ['dddd', 'a', 'ccc', 'bb'],
          expectedResult: ['dddd', 'ccc', 'bb', 'a'],
        },
      ])(
        'collection: $collection, expectedResult: $expectedResult',
        ({ collection, expectedResult }) => {
          // Act
          const actualResult = new MergeSort().sort({
            collection,
            compareFunction,
          });

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });
  });

  describe('user collection', () => {
    interface User {
      name: string;
      age: number;
    }

    describe('sort by age', () => {
      const compareFunction = (a: User, b: User): number => {
        return a.age - b.age;
      };

      test.each<Record<'users' | 'expectedResult', User[]>>([
        {
          users: [
            { name: 'John', age: 30 },
            { name: 'Steve', age: 10 },
            { name: 'Tom', age: 20 },
          ],
          expectedResult: [
            { name: 'Steve', age: 10 },
            { name: 'Tom', age: 20 },
            { name: 'John', age: 30 },
          ],
        },
      ])(
        'users: $users, expectedResult: $expectedResult',
        ({ expectedResult, users }) => {
          // Act
          const actualResult = new MergeSort().sort({
            collection: users,
            compareFunction,
          });

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });

    describe('sort by name', () => {
      const compareFunction = (a: User, b: User): number => {
        return a.name > b.name ? 1 : -1;
      };

      test.each<Record<'users' | 'expectedResult', User[]>>([
        {
          users: [
            { name: 'John', age: 30 },
            { name: 'Steve', age: 10 },
            { name: 'Tom', age: 20 },
          ],
          expectedResult: [
            { name: 'John', age: 30 },
            { name: 'Steve', age: 10 },
            { name: 'Tom', age: 20 },
          ],
        },
      ])(
        'users: $users, expectedResult: $expectedResult',
        ({ expectedResult, users }) => {
          // Act
          const actualResult = new MergeSort().sort({
            collection: users,
            compareFunction,
          });

          // Assert
          expect(actualResult).toStrictEqual(expectedResult);
        },
      );
    });
  });
});
