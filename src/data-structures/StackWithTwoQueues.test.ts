import { describe, expect, test } from 'vitest';

import { StackWithTwoQueues } from './StackWithTwoQueues';

describe('StackWithTwoQueues', () => {
  test('empty stack initialization', () => {
    // Arrange
    const stack = new StackWithTwoQueues();
    const expectedSize = 0;

    // Assert
    expect(stack.size).toBe(expectedSize);
  });

  describe('.prototype.push()', () => {
    test.each([{ value: 123 }])('push 1 value: $value', ({ value }) => {
      // Arrange
      const stack = new StackWithTwoQueues<number>();
      const expectedSize = 1;

      // Act
      stack.push(value);
      const actualSize = stack.size;

      // Assert
      expect(actualSize).toBe(expectedSize);
    });

    test.each([{ values: [123, 456] }])(
      'push 2 values: $values',
      ({ values }) => {
        // Arrange
        const stack = new StackWithTwoQueues<number>();
        stack.push(values[0]);

        const expectedSize = 2;

        // Act
        stack.push(values[1]);
        const actualSize = stack.size;

        // Assert
        expect(actualSize).toBe(expectedSize);
      },
    );

    test.each([{ values: [123, 456, 789] }])(
      'push 3 values: $values',
      ({ values }) => {
        // Arrange
        const stack = new StackWithTwoQueues<number>();
        stack.push(values[0]);
        stack.push(values[1]);

        const expectedSize = 3;

        // Act
        stack.push(values[2]);
        const actualSize = stack.size;

        // Assert
        expect(actualSize).toBe(expectedSize);
      },
    );
  });

  describe('.prototype.pop()', () => {
    const createStack = () => {
      const stack = new StackWithTwoQueues();
      const values = [123, 456, 789];
      values.forEach((value) => stack.push(value));
      return { stack, values };
    };

    test.each([createStack()])(
      'pop the last element from: $values',
      ({ stack, values }) => {
        // Arrange
        const expectedSize = 2;
        const expectedValue = values[2];

        // Act
        const actualValue = stack.pop();

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(stack.size).toBe(expectedSize);
      },
    );

    test.each([createStack()])(
      'pop middle element from: $values',
      ({ stack, values }) => {
        // Arrange
        stack.pop(); // values[2]

        const expectedSize = 1;
        const expectedValue = values[1];

        // Act
        const actualValue = stack.pop();

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(stack.size).toBe(expectedSize);
      },
    );

    test.each([createStack()])(
      'pop the first element from: $values',
      ({ stack, values }) => {
        // Arrange
        stack.pop(); // values[2]
        stack.pop(); // values[1]

        const expectedSize = 0;
        const expectedValue = values[0];

        // Act
        const actualValue = stack.pop();

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(stack.size).toBe(expectedSize);
      },
    );

    test('get null if stack is empty', () => {
      // Arrange
      const stack = new StackWithTwoQueues();
      const expectedSize = 0;

      // Act
      const poppedValue = stack.pop();

      // Assert
      expect(poppedValue).toBeNull();
      expect(stack.size).toBe(expectedSize);
    });
  });
});
