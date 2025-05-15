import { describe, expect, test } from 'vitest';

import { DoublyLinkedList } from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
  test('empty list initialization', () => {
    // Arrange
    const doublyLinkedList = new DoublyLinkedList();
    const expectedLength = 0;

    // Assert
    expect(doublyLinkedList.head).toBeNull();
    expect(doublyLinkedList.tail).toBeNull();
    expect(doublyLinkedList.length).toBe(expectedLength);
  });

  describe('.prototype.push()', () => {
    test.each([{ value: 123 }])('push 1 value: $value', ({ value }) => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList<number>();
      const expectedLength = 1;

      // Act
      doublyLinkedList.push(value);

      // Assert
      expect(doublyLinkedList.head?.value).toBe(value);
      expect(doublyLinkedList.tail?.value).toBe(value);
      expect(doublyLinkedList.head).toBe(doublyLinkedList.tail);
      expect(doublyLinkedList.length).toBe(expectedLength);
    });

    test.each([{ values: [123, 456] }])(
      'push 2 values: $values',
      ({ values }) => {
        // Arrange
        const doublyLinkedList = new DoublyLinkedList<number>();
        const expectedLength = 2;

        // Act
        values.forEach((value) => {
          doublyLinkedList.push(value);
        });

        // Assert
        expect(doublyLinkedList.head?.value).toBe(values[0]);
        expect(doublyLinkedList.tail?.value).toBe(values[1]);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([{ values: [123, 456, 789] }])(
      'push 3 values: $values',
      ({ values }) => {
        // Arrange
        const doublyLinkedList = new DoublyLinkedList<number>();
        const expectedLength = 3;

        // Act
        values.forEach((value) => {
          doublyLinkedList.push(value);
        });

        // Assert
        expect(doublyLinkedList.head?.value).toBe(values[0]);
        expect(doublyLinkedList.tail?.value).toBe(values[2]);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.pop()', () => {
    const createDoublyLinkedList = () => {
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => doublyLinkedList.push(value));
      return { doublyLinkedList, values };
    };

    test.each([createDoublyLinkedList()])(
      'pop the third element from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const expectedValue = values[2];
        const expectedLength = 2;

        // Act
        const thirdNodeValue = doublyLinkedList.pop()?.value;

        // Assert
        expect(thirdNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'pop the second element from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const expectedValue = values[1];
        const expectedLength = 1;
        doublyLinkedList.pop(); // Remove third/last

        // Act
        const secondNodeValue = doublyLinkedList.pop()?.value;

        // Assert
        expect(secondNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.head).toBe(doublyLinkedList.tail);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'pop the first element from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const expectedValue = values[0];
        const expectedLength = 0;
        doublyLinkedList.pop(); // Remove third/last
        doublyLinkedList.pop(); // Remove second

        // Act
        const firstNodeValue = doublyLinkedList.pop()?.value;

        // Assert
        expect(firstNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.head).toBeNull();
        expect(doublyLinkedList.tail).toBeNull();
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test('get undefined if list is empty', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const expectedLength = 0;

      // Act
      const poppedNode = doublyLinkedList.pop();

      // Assert
      expect(poppedNode).toBeUndefined();
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();
      expect(doublyLinkedList.length).toBe(expectedLength);
    });
  });

  describe('.prototype.shift()', () => {
    const createDoublyLinkedList = () => {
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => doublyLinkedList.push(value));
      return { doublyLinkedList, values };
    };

    test.each([createDoublyLinkedList()])(
      'shift the first element from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const expectedValue = values[0];
        const expectedLength = 2;

        // Act
        const firstNodeValue = doublyLinkedList.shift()?.value;

        // Assert
        expect(firstNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'shift the second element from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const expectedValue = values[1];
        const expectedLength = 1;
        doublyLinkedList.shift(); // Remove first

        // Act
        const secondNodeValue = doublyLinkedList.shift()?.value;

        // Assert
        expect(secondNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.head).toBe(doublyLinkedList.tail);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'shift the third element from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const expectedValue = values[2];
        const expectedLength = 0;
        doublyLinkedList.shift(); // Remove first
        doublyLinkedList.shift(); // Remove second

        // Act
        const thirdNodeValue = doublyLinkedList.shift()?.value;

        // Assert
        expect(thirdNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.head).toBeNull();
        expect(doublyLinkedList.tail).toBeNull();
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test('get undefined if list is empty', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const expectedLength = 0;

      // Act
      const shiftedNode = doublyLinkedList.shift();

      // Assert
      expect(shiftedNode).toBeUndefined();
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();
      expect(doublyLinkedList.length).toBe(expectedLength);
    });
  });

  describe('.prototype.unshift()', () => {
    test.each([{ value: 123 }])('unshift 1 value: $value', ({ value }) => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList<number>();
      const expectedLength = 1;

      // Act
      doublyLinkedList.unshift(value);

      // Assert
      expect(doublyLinkedList.head?.value).toBe(value);
      expect(doublyLinkedList.tail?.value).toBe(value);
      expect(doublyLinkedList.head).toBe(doublyLinkedList.tail);
      expect(doublyLinkedList.length).toBe(expectedLength);
    });

    test.each([{ values: [123, 456] }])(
      'unshift 2 values: $values',
      ({ values }) => {
        // Arrange
        const doublyLinkedList = new DoublyLinkedList<number>();
        const expectedLength = 2;
        const expectedHeadValue = values[1];
        const expectedTailValue = values[0];

        // Act
        values.forEach((value) => {
          doublyLinkedList.unshift(value);
        });

        // Assert
        expect(doublyLinkedList.head?.value).toBe(expectedHeadValue);
        expect(doublyLinkedList.tail?.value).toBe(expectedTailValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([{ values: [123, 456, 789] }])(
      'unshift 3 values: $values',
      ({ values }) => {
        // Arrange
        const doublyLinkedList = new DoublyLinkedList<number>();
        const expectedLength = 3;
        const expectedHeadValue = values[2];
        const expectedTailValue = values[0];

        // Act
        values.forEach((value) => {
          doublyLinkedList.unshift(value);
        });

        // Assert
        expect(doublyLinkedList.head?.value).toBe(expectedHeadValue);
        expect(doublyLinkedList.tail?.value).toBe(expectedTailValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.get()', () => {
    test('get null if no value exists at index', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList<number>();
      doublyLinkedList.push(1).push(2).push(3);

      // Act
      const actualValue = doublyLinkedList.get(100);

      // Assert
      expect(actualValue).toBeNull();
    });

    test.each([{ values: [123, 456, 789, 123456, 456789] }])(
      'get values with correct order, values: $values',
      ({ values }) => {
        // Arrange
        const doublyLinkedList = new DoublyLinkedList<number>();
        values.forEach((value) => {
          doublyLinkedList.push(value);
        });

        // Act
        const actualValues = Array.from({ length: values.length }).map(
          (_, index) => doublyLinkedList.get(index)?.value,
        );

        // Assert
        expect(actualValues).toStrictEqual(values);
      },
    );
  });

  describe('.prototype.set()', () => {
    const createDoublyLinkedList = () => {
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => doublyLinkedList.push(value));
      return { doublyLinkedList, values };
    };

    test.each([createDoublyLinkedList()])(
      'set the first element',
      ({ doublyLinkedList }) => {
        // Arrange
        const setIndex = 0;
        const setValue = 412342134;
        const expectedSetStatus = true;

        // Act
        const setStatus = doublyLinkedList.set(setIndex, setValue);
        const actualValue = doublyLinkedList.get(setIndex)?.value;

        // Assert
        expect(setStatus).toBe(expectedSetStatus);
        expect(actualValue).toBe(setValue);
      },
    );

    test.each([createDoublyLinkedList()])(
      'set the second element',
      ({ doublyLinkedList }) => {
        // Arrange
        const setIndex = 1;
        const setValue = 412342134;
        const expectedSetStatus = true;

        // Act
        const setStatus = doublyLinkedList.set(setIndex, setValue);
        const actualValue = doublyLinkedList.get(setIndex)?.value;

        // Assert
        expect(setStatus).toBe(expectedSetStatus);
        expect(actualValue).toBe(setValue);
      },
    );

    test.each([createDoublyLinkedList()])(
      'return false if no node exists at setIndex',
      ({ doublyLinkedList }) => {
        // Arrange
        const setIndex = 999;
        const setValue = 412342134;
        const expectedSetStatus = false;

        // Act
        const setStatus = doublyLinkedList.set(setIndex, setValue);

        // Assert
        expect(setStatus).toBe(expectedSetStatus);
      },
    );
  });

  describe('.prototype.insert()', () => {
    const createDoublyLinkedList = () => {
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => doublyLinkedList.push(value));
      return { doublyLinkedList, values };
    };

    test('insert into empty list', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const expectedLength = 1;
      const insertIndex = 0;
      const value = 456;
      const expectedStatus = true;

      // Act
      const actualStatus = doublyLinkedList.insert(insertIndex, value);
      const actualValue = doublyLinkedList.get(insertIndex)?.value;

      // Assert
      expect(actualStatus).toBe(expectedStatus);
      expect(actualValue).toBe(value);
      expect(doublyLinkedList.head).toBe(doublyLinkedList.tail);
      expect(doublyLinkedList.length).toBe(expectedLength);
    });

    test.each([createDoublyLinkedList()])(
      'insert at the start of list',
      ({ doublyLinkedList }) => {
        // Arrange
        const expectedLength = doublyLinkedList.length + 1;
        const insertIndex = 0;
        const value = 54646556;
        const expectedStatus = true;

        // Act
        const actualStatus = doublyLinkedList.insert(insertIndex, value);
        const actualValue = doublyLinkedList.get(insertIndex)?.value;

        // Assert
        expect(actualStatus).toBe(expectedStatus);
        expect(actualValue).toBe(value);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'insert at the end of list',
      ({ doublyLinkedList }) => {
        // Arrange
        const expectedLength = doublyLinkedList.length + 1;
        const insertIndex = doublyLinkedList.length;
        const value = 54646556;
        const expectedStatus = true;

        // Act
        const actualStatus = doublyLinkedList.insert(insertIndex, value);
        const actualValue = doublyLinkedList.get(insertIndex)?.value;

        // Assert
        expect(actualStatus).toBe(expectedStatus);
        expect(actualValue).toBe(value);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'insert at somewhere middle of list',
      ({ doublyLinkedList }) => {
        // Arrange
        const expectedLength = doublyLinkedList.length + 1;
        const insertIndex = 1;
        const value = 54646556;
        const expectedStatus = true;

        // Act
        const actualStatus = doublyLinkedList.insert(insertIndex, value);
        const actualValue = doublyLinkedList.get(insertIndex)?.value;

        // Assert
        expect(actualStatus).toBe(expectedStatus);
        expect(actualValue).toBe(value);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'try to insert at outside of list',
      ({ doublyLinkedList }) => {
        // Arrange
        const expectedLength = doublyLinkedList.length;
        const insertIndexes = [-1, 100];
        const value = 54646556;
        const expectedStatuses = [false, false];

        // Act
        const actualStatuses = insertIndexes.map((insertIndex) =>
          doublyLinkedList.insert(insertIndex, value),
        );

        // Assert
        expect(actualStatuses).toStrictEqual(expectedStatuses);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.remove()', () => {
    const createDoublyLinkedList = () => {
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => doublyLinkedList.push(value));
      return { doublyLinkedList, values };
    };

    test.each([createDoublyLinkedList()])(
      'remove the first node from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const index = 0;
        const expectedValue = values[index];
        const expectedLength = 2;

        // Act
        const removedNodeValue = doublyLinkedList.remove(index)?.value;

        // Assert
        expect(removedNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'remove middle node from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const index = 1;
        const expectedValue = values[index];
        const expectedLength = doublyLinkedList.length - 1;

        // Act
        const removedNodeValue = doublyLinkedList.remove(index)?.value;

        // Assert
        expect(removedNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'remove the last node from: $values',
      ({ doublyLinkedList, values }) => {
        // Arrange
        const index = doublyLinkedList.length - 1;
        const expectedValue = values[index];
        const expectedLength = doublyLinkedList.length - 1;

        // Act
        const removedNodeValue = doublyLinkedList.remove(index)?.value;

        // Assert
        expect(removedNodeValue).toBe(expectedValue);
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createDoublyLinkedList()])(
      'return undefined if no node exists at index',
      ({ doublyLinkedList }) => {
        // Arrange
        const index = 100;
        const expectedLength = doublyLinkedList.length;

        // Act
        const removedNode = doublyLinkedList.remove(index);

        // Assert
        expect(removedNode).toBeUndefined();
        expect(doublyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.reverse()', () => {
    test('do nothing if list is empty', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const expectedLength = 0;

      // Act
      doublyLinkedList.reverse();

      // Assert
      expect(doublyLinkedList.length).toBe(expectedLength);
      expect(doublyLinkedList.head).toBeNull();
      expect(doublyLinkedList.tail).toBeNull();
    });

    test('do nothing if list has only one item', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList<number>();
      doublyLinkedList.push(123);
      const expectedLength = 1;

      // Act
      doublyLinkedList.reverse();

      // Assert
      expect(doublyLinkedList.length).toBe(expectedLength);
      expect(doublyLinkedList.head).toBe(doublyLinkedList.tail);
    });

    test('reverse list properly', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList<number>();
      const values = [123, 456, 789, 123456789];
      values.forEach((value) => {
        doublyLinkedList.push(value);
      });
      const expectedValues = values.slice().reverse();
      const expectedLength = values.length;

      // Act
      doublyLinkedList.reverse();
      const actualValues = values.map(
        (_value, index) => doublyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
      expect(doublyLinkedList.length).toBe(expectedLength);
    });
  });

  describe('.prototype.rotate()', () => {
    test('rotate by zero does nothing', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789, 123456, 456789];
      const rotateAmount = 0;
      const expectedValues = values.slice();
      values.forEach((value) => {
        doublyLinkedList.push(value);
      });

      // Act
      doublyLinkedList.rotate(rotateAmount);
      const actualValues = values.map(
        (_value, index) => doublyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
    });

    test('rotate by positive number', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789, 123456, 456789];
      const rotateAmount = 2;
      const expectedValues = [789, 123456, 456789, 123, 456];
      values.forEach((value) => {
        doublyLinkedList.push(value);
      });

      // Act
      doublyLinkedList.rotate(rotateAmount);
      const actualValues = values.map(
        (_value, index) => doublyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
    });

    test('rotate by negative number', () => {
      // Arrange
      const doublyLinkedList = new DoublyLinkedList();
      const values = [123, 456, 789, 123456, 456789];
      const rotateAmount = -2;
      const expectedValues = [123456, 456789, 123, 456, 789];
      values.forEach((value) => {
        doublyLinkedList.push(value);
      });

      // Act
      doublyLinkedList.rotate(rotateAmount);
      const actualValues = values.map(
        (_value, index) => doublyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
    });
  });
});
