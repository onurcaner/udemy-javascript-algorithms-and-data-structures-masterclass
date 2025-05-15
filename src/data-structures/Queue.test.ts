import { describe, expect, test } from 'vitest';

import { Queue } from './Queue';

describe('Queue', () => {
  test('empty queue initialization', () => {
    // Arrange
    const queue = new Queue();
    const expectedSize = 0;

    // Assert
    expect(queue.first).toBeNull();
    expect(queue.last).toBeNull();
    expect(queue.size).toBe(expectedSize);
  });

  describe('.prototype.enqueue()', () => {
    test.each([{ value: 123 }])('enqueue 1 value: $value', ({ value }) => {
      // Arrange
      const queue = new Queue<number>();

      const expectedSize = 1;
      const expectedFirstValue = value;
      const expectedLastValue = value;

      // Act
      const actualSize = queue.enqueue(value);

      // Assert
      expect(queue.first?.value).toBe(expectedFirstValue);
      expect(queue.last?.value).toBe(expectedLastValue);
      expect(queue.first).toBe(queue.last);
      expect(actualSize).toBe(expectedSize);
    });

    test.each([{ values: [123, 456] }])(
      'enqueue 2 values: $values',
      ({ values }) => {
        // Arrange
        const queue = new Queue<number>();
        queue.enqueue(values[0]);

        const expectedSize = 2;
        const expectedFirstValue = values[0];
        const expectedLastValue = values[1];

        // Act
        const actualSize = queue.enqueue(values[1]);

        // Assert
        expect(queue.first?.value).toBe(expectedFirstValue);
        expect(queue.last?.value).toBe(expectedLastValue);
        expect(actualSize).toBe(expectedSize);
      },
    );

    test.each([{ values: [123, 456, 789] }])(
      'enqueue 3 values: $values',
      ({ values }) => {
        // Arrange
        const queue = new Queue<number>();
        queue.enqueue(values[0]);
        queue.enqueue(values[1]);

        const expectedSize = 3;
        const expectedFirstValue = values[0];
        const expectedLastValue = values[2];

        // Act
        const actualSize = queue.enqueue(values[2]);

        // Assert
        expect(queue.first?.value).toBe(expectedFirstValue);
        expect(queue.last?.value).toBe(expectedLastValue);
        expect(actualSize).toBe(expectedSize);
      },
    );
  });

  describe('.prototype.dequeue()', () => {
    const createQueue = () => {
      const queue = new Queue();
      const values = [123, 456, 789];
      values.forEach((value) => queue.enqueue(value));
      return { queue, values };
    };

    test.each([createQueue()])(
      'dequeue the first element from: $values',
      ({ queue, values }) => {
        // Arrange
        const expectedSize = 2;
        const expectedValue = values[0];

        // Act
        const actualValue = queue.dequeue();

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(queue.size).toBe(expectedSize);
      },
    );

    test.each([createQueue()])(
      'dequeue middle element from: $values',
      ({ queue, values }) => {
        // Arrange
        queue.dequeue(); // values[0]

        const expectedSize = 1;
        const expectedValue = values[1];

        // Act
        const actualValue = queue.dequeue();

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(queue.first).toBe(queue.last);
        expect(queue.size).toBe(expectedSize);
      },
    );

    test.each([createQueue()])(
      'dequeue the last element from: $values',
      ({ queue, values }) => {
        // Arrange
        queue.dequeue(); // values[0]
        queue.dequeue(); // values[1]

        const expectedSize = 0;
        const expectedValue = values[2];

        // Act
        const actualValue = queue.dequeue();

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(queue.first).toBeNull();
        expect(queue.last).toBeNull();
        expect(queue.size).toBe(expectedSize);
      },
    );

    test('get null if the queue is empty', () => {
      // Arrange
      const queue = new Queue();
      const expectedSize = 0;

      // Act
      const dequeuedValue = queue.dequeue();

      // Assert
      expect(dequeuedValue).toBeNull();
      expect(queue.first).toBeNull();
      expect(queue.last).toBeNull();
      expect(queue.size).toBe(expectedSize);
    });
  });
});
