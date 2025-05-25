import { describe, expect, test } from 'vitest';

import { MaxBinaryHeap } from './MaxBinaryHeap';

describe('MaxBinaryHeap', () => {
  test('correct initialization', () => {
    // Arrange
    const expectedValues: number[] = [];

    // Act
    const actualValues = new MaxBinaryHeap().values;

    // Assert
    expect(actualValues).toStrictEqual(expectedValues);
  });

  describe('.prototype.insert()', () => {
    /**
     * ________________9
     *
     * _______8_________________5
     *
     * __6_________7_______1_________4
     *
     * 0___3_____2
     */
    const buildMaxBinaryHeap = (size: number) => {
      const maxBinaryHeap = new MaxBinaryHeap();
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, size);
      values.forEach((value) => {
        maxBinaryHeap.insert(value);
      });

      return { maxBinaryHeap, values };
    };

    test.each([
      { ...buildMaxBinaryHeap(1), expectedHeap: [0] },
      { ...buildMaxBinaryHeap(2), expectedHeap: [1, 0] },
      { ...buildMaxBinaryHeap(3), expectedHeap: [2, 0, 1] },
      { ...buildMaxBinaryHeap(4), expectedHeap: [3, 2, 1, 0] },
      { ...buildMaxBinaryHeap(5), expectedHeap: [4, 3, 1, 0, 2] },
      { ...buildMaxBinaryHeap(6), expectedHeap: [5, 3, 4, 0, 2, 1] },
      { ...buildMaxBinaryHeap(7), expectedHeap: [6, 3, 5, 0, 2, 1, 4] },
      { ...buildMaxBinaryHeap(8), expectedHeap: [7, 6, 5, 3, 2, 1, 4, 0] },
      { ...buildMaxBinaryHeap(9), expectedHeap: [8, 7, 5, 6, 2, 1, 4, 0, 3] },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [9, 8, 5, 6, 7, 1, 4, 0, 3, 2],
      },
    ])(
      'insert: $values, expectedHeap: $expectedHeap',
      ({ maxBinaryHeap, expectedHeap }) => {
        // Arrange
        const actualHeap = maxBinaryHeap.values;

        // Assert
        expect(actualHeap).toStrictEqual(expectedHeap);
      },
    );
  });

  describe('.prototype.extractMax()', () => {
    /**
     * ________________9
     *
     * _______8_________________5
     *
     * __6_________7_______1_________4
     *
     * 0___3_____2
     */
    const buildMaxBinaryHeap = (size: number) => {
      const maxBinaryHeap = new MaxBinaryHeap();
      const values = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].slice(0, size);
      values.forEach((value) => {
        maxBinaryHeap.insert(value);
      });

      return { maxBinaryHeap, values };
    };

    test('return undefined if heap is empty', () => {
      // Arrange
      const maxBinaryHeap = new MaxBinaryHeap();

      // Act
      const actualExtractedMaxValue = maxBinaryHeap.extractMax();

      // Assert
      expect(actualExtractedMaxValue).toBeUndefined();
    });

    test.each([
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [9, 8, 5, 6, 7, 1, 4, 0, 3, 2],
        expectedMaxValues: [],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [8, 7, 5, 6, 2, 1, 4, 0, 3],
        expectedMaxValues: [9],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [7, 6, 5, 3, 2, 1, 4, 0],
        expectedMaxValues: [9, 8],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [6, 3, 5, 0, 2, 1, 4],
        expectedMaxValues: [9, 8, 7],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [5, 3, 4, 0, 2, 1],
        expectedMaxValues: [9, 8, 7, 6],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [4, 3, 1, 0, 2],
        expectedMaxValues: [9, 8, 7, 6, 5],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [3, 2, 1, 0],
        expectedMaxValues: [9, 8, 7, 6, 5, 4],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [2, 0, 1],
        expectedMaxValues: [9, 8, 7, 6, 5, 4, 3],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [1, 0],
        expectedMaxValues: [9, 8, 7, 6, 5, 4, 3, 2],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [0],
        expectedMaxValues: [9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      {
        ...buildMaxBinaryHeap(10),
        expectedHeap: [],
        expectedMaxValues: [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
      },
    ])(
      'extractedMaxValues: $extractedMaxValues, expectedHeap: $expectedHeap',
      ({ maxBinaryHeap, expectedHeap, expectedMaxValues }) => {
        // Act
        const actualExtractedMaxValues = Array.from({
          length: expectedMaxValues.length,
        }).map(() => maxBinaryHeap.extractMax());
        const actualHeap = maxBinaryHeap.values;

        // Assert
        expect(actualHeap).toStrictEqual(expectedHeap);
        expect(actualExtractedMaxValues).toStrictEqual(expectedMaxValues);
      },
    );
  });
});
