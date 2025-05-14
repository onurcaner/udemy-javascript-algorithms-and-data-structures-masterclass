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
      expect(singlyLinkedList.head).toBe(singlyLinkedList.tail);
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

    test.each([{ values: [123, 456, 789, 123456, 456789] }])(
      'get values with correct order, values: $values',
      ({ values }) => {
        // Arrange
        const singlyLinkedList = new SinglyLinkedList<number>();
        values.forEach((value) => {
          singlyLinkedList.push(value);
        });

        // Act
        const actualValues = Array.from({ length: values.length }).map(
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
        // Arrange
        const expectedLength = 2;

        // Act
        const thirdNode = singlyLinkedList.pop();

        // Assert
        expect(thirdNode?.value).toBe(values[2]);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'pop second element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const expectedLength = 1;
        singlyLinkedList.pop(); // Remove third/last

        // Act
        const secondNode = singlyLinkedList.pop();

        // Assert
        expect(secondNode?.value).toBe(values[1]);
        expect(singlyLinkedList.head).toBe(singlyLinkedList.tail);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'pop first element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const expectedLength = 0;
        singlyLinkedList.pop(); // Remove third/last
        singlyLinkedList.pop(); // Remove second

        // Act
        const firstNode = singlyLinkedList.pop();

        // Assert
        expect(firstNode?.value).toBe(values[0]);
        expect(singlyLinkedList.head).toBeNull();
        expect(singlyLinkedList.tail).toBeNull();
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test('get undefined if empty', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const expectedLength = 0;

      // Act
      const poppedNode = singlyLinkedList.pop();

      // Assert
      expect(poppedNode).toBeUndefined();
      expect(singlyLinkedList.head).toBeNull();
      expect(singlyLinkedList.tail).toBeNull();
      expect(singlyLinkedList.length).toBe(expectedLength);
    });
  });

  describe('.prototype.shift()', () => {
    const createSinglyLinkedList = () => {
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => singlyLinkedList.push(value));
      return { singlyLinkedList, values };
    };

    test.each([createSinglyLinkedList()])(
      'shift first element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const expectedLength = 2;

        // Act
        const firstNode = singlyLinkedList.shift();

        // Assert
        expect(firstNode?.value).toBe(values[0]);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'shift second element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const expectedLength = 1;
        singlyLinkedList.shift(); // Remove first

        // Act
        const secondNode = singlyLinkedList.shift();

        // Assert
        expect(secondNode?.value).toBe(values[1]);
        expect(singlyLinkedList.head).toBe(singlyLinkedList.tail);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'shift third element from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const expectedLength = 0;
        singlyLinkedList.shift(); // Remove first
        singlyLinkedList.shift(); // Remove second

        // Act
        const thirdNode = singlyLinkedList.shift();

        // Assert
        expect(thirdNode?.value).toBe(values[2]);
        expect(singlyLinkedList.head).toBeNull();
        expect(singlyLinkedList.tail).toBeNull();
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test('get undefined if empty', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const expectedLength = 0;

      // Act
      const shiftedNode = singlyLinkedList.shift();

      // Assert
      expect(shiftedNode).toBeUndefined();
      expect(singlyLinkedList.head).toBeNull();
      expect(singlyLinkedList.tail).toBeNull();
      expect(singlyLinkedList.length).toBe(expectedLength);
    });
  });

  describe('.prototype.unshift()', () => {
    test.each([{ value: 123 }])('unshift 1 value: $value', ({ value }) => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList<number>();
      const expectedLength = 1;

      // Act
      singlyLinkedList.unshift(value);

      // Assert
      expect(singlyLinkedList.head?.value).toBe(value);
      expect(singlyLinkedList.tail?.value).toBe(value);
      expect(singlyLinkedList.head).toBe(singlyLinkedList.tail);
      expect(singlyLinkedList.length).toBe(expectedLength);
    });

    test.each([{ values: [123, 456] }])(
      'unshift 2 values: $values',
      ({ values }) => {
        // Arrange
        const singlyLinkedList = new SinglyLinkedList<number>();
        const expectedLength = 2;

        // Act
        values.forEach((value) => {
          singlyLinkedList.unshift(value);
        });

        // Assert
        expect(singlyLinkedList.head?.value).toBe(values[1]);
        expect(singlyLinkedList.tail?.value).toBe(values[0]);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([{ values: [123, 456, 789] }])(
      'unshift 3 values: $values',
      ({ values }) => {
        // Arrange
        const singlyLinkedList = new SinglyLinkedList<number>();
        const expectedLength = 3;

        // Act
        values.forEach((value) => {
          singlyLinkedList.unshift(value);
        });

        // Assert
        expect(singlyLinkedList.head?.value).toBe(values[2]);
        expect(singlyLinkedList.tail?.value).toBe(values[0]);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.set()', () => {
    const createSinglyLinkedList = () => {
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => singlyLinkedList.push(value));
      return { singlyLinkedList, values };
    };

    test.each([createSinglyLinkedList()])(
      'set first element',
      ({ singlyLinkedList }) => {
        // Arrange
        const setIndex = 0;
        const setValue = 412342134;
        const expectedSetStatus = true;

        // Act
        const setStatus = singlyLinkedList.set(setIndex, setValue);
        const actualValue = singlyLinkedList.get(setIndex)?.value;

        // Assert
        expect(setStatus).toBe(expectedSetStatus);
        expect(actualValue).toBe(setValue);
      },
    );

    test.each([createSinglyLinkedList()])(
      'set second element',
      ({ singlyLinkedList }) => {
        // Arrange
        const setIndex = 1;
        const setValue = 412342134;
        const expectedSetStatus = true;

        // Act
        const setStatus = singlyLinkedList.set(setIndex, setValue);
        const actualValue = singlyLinkedList.get(setIndex)?.value;

        // Assert
        expect(setStatus).toBe(expectedSetStatus);
        expect(actualValue).toBe(setValue);
      },
    );

    test.each([createSinglyLinkedList()])(
      'return false if no node exists at setIndex',
      ({ singlyLinkedList }) => {
        // Arrange
        const setIndex = 999;
        const setValue = 412342134;
        const expectedSetStatus = false;

        // Act
        const setStatus = singlyLinkedList.set(setIndex, setValue);

        // Assert
        expect(setStatus).toBe(expectedSetStatus);
      },
    );
  });

  describe('.prototype.insert()', () => {
    const createSinglyLinkedList = () => {
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => singlyLinkedList.push(value));
      return { singlyLinkedList, values };
    };

    test('insert into empty list', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const expectedLength = 1;
      const insertIndex = 0;
      const value = 456;
      const expectedStatus = true;

      // Act
      const actualStatus = singlyLinkedList.insert(insertIndex, value);
      const actualValue = singlyLinkedList.get(insertIndex)?.value;

      // Assert
      expect(actualStatus).toBe(expectedStatus);
      expect(actualValue).toBe(value);
      expect(singlyLinkedList.head).toBe(singlyLinkedList.tail);
      expect(singlyLinkedList.length).toBe(expectedLength);
    });

    test.each([createSinglyLinkedList()])(
      'insert at the start of the list',
      ({ singlyLinkedList }) => {
        // Arrange
        const expectedLength = singlyLinkedList.length + 1;
        const insertIndex = 0;
        const value = 54646556;
        const expectedStatus = true;

        // Act
        const actualStatus = singlyLinkedList.insert(insertIndex, value);
        const actualValue = singlyLinkedList.get(insertIndex)?.value;

        // Assert
        expect(actualStatus).toBe(expectedStatus);
        expect(actualValue).toBe(value);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'insert at the end of the list',
      ({ singlyLinkedList }) => {
        // Arrange
        const expectedLength = singlyLinkedList.length + 1;
        const insertIndex = singlyLinkedList.length;
        const value = 54646556;
        const expectedStatus = true;

        // Act
        const actualStatus = singlyLinkedList.insert(insertIndex, value);
        const actualValue = singlyLinkedList.get(insertIndex)?.value;

        // Assert
        expect(actualStatus).toBe(expectedStatus);
        expect(actualValue).toBe(value);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'insert at somewhere middle of the list',
      ({ singlyLinkedList }) => {
        // Arrange
        const expectedLength = singlyLinkedList.length + 1;
        const insertIndex = 1;
        const value = 54646556;
        const expectedStatus = true;

        // Act
        const actualStatus = singlyLinkedList.insert(insertIndex, value);
        const actualValue = singlyLinkedList.get(insertIndex)?.value;

        // Assert
        expect(actualStatus).toBe(expectedStatus);
        expect(actualValue).toBe(value);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'try to insert at outside of the list',
      ({ singlyLinkedList }) => {
        // Arrange
        const expectedLength = singlyLinkedList.length;
        const insertIndexes = [-1, 100];
        const value = 54646556;
        const expectedStatuses = [false, false];

        // Act
        const actualStatuses = insertIndexes.map((insertIndex) =>
          singlyLinkedList.insert(insertIndex, value),
        );

        // Assert
        expect(actualStatuses).toStrictEqual(expectedStatuses);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.remove()', () => {
    const createSinglyLinkedList = () => {
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789];
      values.forEach((value) => singlyLinkedList.push(value));
      return { singlyLinkedList, values };
    };

    test.each([createSinglyLinkedList()])(
      'remove first node from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const index = 0;
        const expectedValue = values[index];
        const expectedLength = 2;

        // Act
        const removedNode = singlyLinkedList.remove(index);

        // Assert
        expect(removedNode?.value).toBe(expectedValue);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'remove middle node from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const index = 1;
        const expectedValue = values[index];
        const expectedLength = singlyLinkedList.length - 1;

        // Act
        const removedNode = singlyLinkedList.remove(index);

        // Assert
        expect(removedNode?.value).toBe(expectedValue);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'remove last node from: $values',
      ({ singlyLinkedList, values }) => {
        // Arrange
        const index = singlyLinkedList.length - 1;
        const expectedValue = values[index];
        const expectedLength = singlyLinkedList.length - 1;

        // Act
        const removedNode = singlyLinkedList.remove(index);

        // Assert
        expect(removedNode?.value).toBe(expectedValue);
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );

    test.each([createSinglyLinkedList()])(
      'return undefined if no node exists at index',
      ({ singlyLinkedList }) => {
        // Arrange
        const index = 100;
        const expectedLength = singlyLinkedList.length;

        // Act
        const removedNode = singlyLinkedList.remove(index);

        // Assert
        expect(removedNode).toBeUndefined();
        expect(singlyLinkedList.length).toBe(expectedLength);
      },
    );
  });

  describe('.prototype.reverse()', () => {
    test('do nothing if list is empty', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const expectedLength = 0;

      // Act
      singlyLinkedList.reverse();

      // Assert
      expect(singlyLinkedList.length).toBe(expectedLength);
      expect(singlyLinkedList.head).toBeNull();
      expect(singlyLinkedList.tail).toBeNull();
    });

    test('do nothing if list has only one item', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList<number>();
      singlyLinkedList.push(123);
      const expectedLength = 1;

      // Act
      singlyLinkedList.reverse();

      // Assert
      expect(singlyLinkedList.length).toBe(expectedLength);
      expect(singlyLinkedList.head).toBe(singlyLinkedList.tail);
    });

    test('reverse the list properly', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList<number>();
      const values = [123, 456, 789, 123456789];
      values.forEach((value) => {
        singlyLinkedList.push(value);
      });
      const expectedValues = values.slice().reverse();
      const expectedLength = values.length;

      // Act
      singlyLinkedList.reverse();
      const actualValues = values.map(
        (_value, index) => singlyLinkedList.get(index)?.value,
      );

      // Assert
      expect(singlyLinkedList.length).toBe(expectedLength);
      expect(actualValues).toStrictEqual(expectedValues);
    });
  });

  describe('.prototype.rotate()', () => {
    test('rotate by zero does nothing', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789, 123456, 456789];
      const rotateAmount = 0;
      const expectedValues = values.slice();
      values.forEach((value) => {
        singlyLinkedList.push(value);
      });

      // Act
      singlyLinkedList.rotate(rotateAmount);
      const actualValues = values.map(
        (_value, index) => singlyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
    });

    test('rotate by positive number', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789, 123456, 456789];
      const rotateAmount = 2;
      const expectedValues = [789, 123456, 456789, 123, 456];
      values.forEach((value) => {
        singlyLinkedList.push(value);
      });

      // Act
      singlyLinkedList.rotate(rotateAmount);
      const actualValues = values.map(
        (_value, index) => singlyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
    });

    test('rotate by negative number', () => {
      // Arrange
      const singlyLinkedList = new SinglyLinkedList();
      const values = [123, 456, 789, 123456, 456789];
      const rotateAmount = -2;
      const expectedValues = [123456, 456789, 123, 456, 789];
      values.forEach((value) => {
        singlyLinkedList.push(value);
      });

      // Act
      singlyLinkedList.rotate(rotateAmount);
      const actualValues = values.map(
        (_value, index) => singlyLinkedList.get(index)?.value,
      );

      // Assert
      expect(actualValues).toStrictEqual(expectedValues);
    });
  });
});
