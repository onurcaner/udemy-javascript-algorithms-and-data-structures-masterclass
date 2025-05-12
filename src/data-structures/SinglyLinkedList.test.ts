import { describe, expect, test } from 'vitest';

import { SinglyLinkedList } from './SinglyLinkedList';

describe('SinglyLinkedList', () => {
  test('empty list initialization', () => {
    // Arrange
    const singlyLinkedList = new SinglyLinkedList();
    const expectedLength = 0;

    // Assert
    expect(singlyLinkedList.head).toBeNull();
    expect(singlyLinkedList.tail).toBeNull();
    expect(singlyLinkedList.length).toBe(expectedLength);
  });

  describe('.prototype.push()', () => {
    test.each([{ value: 123 }])('push 1 value: $value', ({ value }) => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList<number>();
      const expectedLength = 1;

      // Act
      singlyLinkedList.push(value);

      // Assert
      expect(singlyLinkedList.head?.value).toBe(value);
      expect(singlyLinkedList.tail?.value).toBe(value);
      expect(singlyLinkedList.length).toBe(expectedLength);
    });

    test.each([{ values: [123, 456] }])(
      'push 2 values: $values',
      ({ values }) => {
        // Arrange
        const singlyLinkedList = new SinglyLinkedList<number>();
        const expectedLength = 2;

        // Act
        values.forEach((value) => {
          singlyLinkedList.push(value);
        });

        // Assert
        expect(singlyLinkedList.head?.value).toBe(values[0]);
        expect(singlyLinkedList.tail?.value).toBe(values[1]);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([{ values: [123, 456, 789] }])(
      'push 3 values: $values',
      ({ values }) => {
        // Arrange
        const singlyLinkedList = new SinglyLinkedList<number>();
        const expectedLength = 3;

        // Act
        values.forEach((value) => {
          singlyLinkedList.push(value);
        });

        // Assert
        expect(singlyLinkedList.head?.value).toBe(values[0]);
        expect(singlyLinkedList.tail?.value).toBe(values[2]);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.get()', () => {
    test('get null if no value exists at index', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList<number>();

      // Act
      singlyLinkedList.push(1).push(2).push(3);
      const actualValue = singlyLinkedList.get(100);

      // Assert
      expect(actualValue).toBeNull();
    });

    test.each([{ values: [123, 456, 789, 123456] }])(
      'get values with correct order, values: $values',
      ({ values }) => {
        // Arrange
        const singlyLinkedList = new SinglyLinkedList<number>();
        values.forEach((value) => {
          singlyLinkedList.push(value);
        });

        // Act
        const actualValues = Array.from({ length: 4 }).map(
          (_, index) => singlyLinkedList.get(index)?.value,
        );

        // Assert
        expect(actualValues).toStrictEqual(values);
      },
    );
  });

  describe('.prototype.pop()', () => {
    const createSinglyLinkedList = () => {
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => singlyLinkedList.push(value));
      return { singlyLinkedList, values };
    };

    test.each([createSinglyLinkedList()])(
      'pop third element from: $values',
      ({ singlyLinkedList, values }) => {
        // Act
        const thirdNode = singlyLinkedList.pop();

        // Assert
        expect(thirdNode?.value).toBe(values[2]);
      },
    );

    test.each([createSinglyLinkedList()])(
      'pop second element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        singlyLinkedList.pop(); // Remove third/last

        // Act
        const secondNode = singlyLinkedList.pop();

        // Assert
        expect(secondNode?.value).toBe(values[1]);
      },
    );

    test.each([createSinglyLinkedList()])(
      'pop first element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        singlyLinkedList.pop(); // Remove third/last
        singlyLinkedList.pop(); // Remove second

        // Act
        const firstNode = singlyLinkedList.pop();

        // Assert
        expect(firstNode?.value).toBe(values[0]);
      },
    );

    test('get undefined if empty', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();

      // Act
      const poppedNode = singlyLinkedList.pop();

      // Assert
      expect(poppedNode).toBeUndefined();
    });
  });
});
