import { describe, expect, test } from 'vitest';

import { BinarySearchTree } from './BinarySearchTree';

describe('BinarySearchTree', () => {
  test('new instance initialization', () => {
    // Act
    const binarySearchTree = new BinarySearchTree();

    // Assert
    expect(binarySearchTree.root).toBeNull();
  });

  test('.createNode() constructs a BinarySearchTreeNode instance', () => {
    // Arrange
    const value = 65465461;

    // Act
    const node = BinarySearchTree.createNode(value);

    // Assert
    expect(node.value).toBe(value);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  describe('.prototype.insert()', () => {
    /**
     * ______________20
     *
     * ________10__________30
     *
     * _____05____15____25
     *
     * __02
     *
     * _____04
     */
    function createBinarySearchTree(size: number) {
      const binarySearchTree = new BinarySearchTree();
      const values = [20, 10, 30, 5, 15, 25, 2, 4].slice(0, size);
      values.forEach((value) => {
        binarySearchTree.insert(value);
      });

      return { binarySearchTree, values };
    }

    test.each([createBinarySearchTree(1)])(
      'insert 1st value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.value).toBe(values[values.length - 1]);
      },
    );

    test.each([createBinarySearchTree(2)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.left?.value).toBe(
          values[values.length - 1],
        );
      },
    );

    test.each([createBinarySearchTree(3)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.right?.value).toBe(
          values[values.length - 1],
        );
      },
    );

    test.each([createBinarySearchTree(4)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.left?.left?.value).toBe(
          values[values.length - 1],
        );
      },
    );

    test.each([createBinarySearchTree(5)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.left?.right?.value).toBe(
          values[values.length - 1],
        );
      },
    );

    test.each([createBinarySearchTree(6)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.right?.left?.value).toBe(
          values[values.length - 1],
        );
      },
    );

    test.each([createBinarySearchTree(7)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.left?.left?.left?.value).toBe(
          values[values.length - 1],
        );
      },
    );

    test.each([createBinarySearchTree(8)])(
      'insert 2nd value from $values into binary search tree',
      ({ binarySearchTree, values }) => {
        expect(binarySearchTree.root?.left?.left?.left?.right?.value).toBe(
          values[values.length - 1],
        );
      },
    );
  });

  describe('.prototype.find()', () => {
    /**
     * ______________20
     *
     * ________10__________30
     *
     * _____05____15____25
     *
     * __02
     *
     * _____04
     */
    function createBinarySearchTree(size: number) {
      const binarySearchTree = new BinarySearchTree();
      const values = [20, 10, 30, 5, 15, 25, 2, 4].slice(0, size);
      values.forEach((value) => {
        binarySearchTree.insert(value);
      });

      return { binarySearchTree, values };
    }

    test.each([createBinarySearchTree(8)])(
      'find existing values',
      ({ binarySearchTree, values }) => {
        // Act
        const foundNodes = values.map((value) => binarySearchTree.find(value));
        const foundValues = foundNodes.map((node) => node?.value);

        // Assert
        expect(foundNodes).not.toContain(undefined);
        expect(foundValues).toStrictEqual(values);
      },
    );

    test.each([createBinarySearchTree(8)])(
      'return undefined if search value does not exist.',
      ({ binarySearchTree }) => {
        const searchValue = 'you can not find string in bst<number>';

        // Act
        const foundNode = binarySearchTree.find(
          searchValue as unknown as number,
        );

        // Assert
        expect(foundNode).toBeUndefined();
      },
    );
  });

  describe('.prototype.remove()', () => {
    /**
     * ______________20
     *
     * ________10__________30
     *
     * _____05____15____25
     *
     * __02
     *
     * _____04
     */
    function createBinarySearchTree(size: number) {
      const binarySearchTree = new BinarySearchTree();
      const values = [20, 10, 30, 5, 15, 25, 2, 4].slice(0, size);
      values.forEach((value) => {
        binarySearchTree.insert(value);
      });

      return { binarySearchTree, values };
    }

    test.each([createBinarySearchTree(8)])(
      'remove leaf',
      ({ binarySearchTree }) => {
        /**
         * ______________20
         * ________10__________30
         * _____05____15____25
         * __02
         * ____(04)
         */
        // Arrange
        const expectedValue = 4;

        // Act
        const removedNode = binarySearchTree.remove(expectedValue);
        const actualValue = removedNode?.value;

        // Assert
        expect(actualValue).toBe(expectedValue);
        expect(removedNode?.left).toBeNull();
        expect(removedNode?.right).toBeNull();
        expect(binarySearchTree.root?.left?.left?.left?.right).toBe(null);
      },
    );

    test.each([createBinarySearchTree(8)])(
      'remove node with one children',
      ({ binarySearchTree }) => {
        /**
         * Before
         * ______________20
         * ________10__________30
         * ____(05)___15____25
         * _(02)
         * _____04
         *
         * After
         * ______________20
         * ________10__________30
         * _____02____15____25
         * _______04
         */
        // Arrange
        const expectedRemovedValue = 5;
        const newValue = 2;

        // Act
        const removedNode = binarySearchTree.remove(expectedRemovedValue);
        const actualRemovedValue = removedNode?.value;

        // Assert
        expect(actualRemovedValue).toBe(expectedRemovedValue);
        expect(removedNode?.left).toBeNull();
        expect(removedNode?.right).toBeNull();
        expect(binarySearchTree.root?.left?.left?.value).toBe(newValue);
      },
    );

    test.each([createBinarySearchTree(8)])(
      'remove node with two children',
      ({ binarySearchTree }) => {
        /**
         * Before
         * _____________(20)
         * ________10__________30
         * _____05____15___(25)
         * __02
         * _____04
         *
         * After
         * ______________25
         * ________10__________30
         * _____05____15
         * __02
         * _____04
         */
        // Arrange
        const expectedRemovedValue = 20;
        const newValue = 25;

        // Act
        const removedNode = binarySearchTree.remove(expectedRemovedValue);
        const actualRemovedValue = removedNode?.value;

        // Assert
        expect(actualRemovedValue).toBe(expectedRemovedValue);
        expect(removedNode?.left).toBeNull();
        expect(removedNode?.right).toBeNull();
        expect(binarySearchTree.root?.value).toBe(newValue);
      },
    );
  });

  describe('.prototype.findSecondLargest()', () => {
    /**
     * ______________20
     *
     * ________10__________30
     *
     * _____05____15____25
     *
     * __02
     *
     * _____04
     */
    function createBinarySearchTree(size: number) {
      const binarySearchTree = new BinarySearchTree();
      const values = [20, 10, 30, 5, 15, 25, 2, 4].slice(0, size);
      values.forEach((value) => {
        binarySearchTree.insert(value);
      });

      return { binarySearchTree, values };
    }

    test.each([createBinarySearchTree(8)])(
      'find the second largest value',
      ({ binarySearchTree }) => {
        // Arrange
        const expectedSecondLargestValue = 25;

        // Act
        const actualSecondLargestValue = binarySearchTree.findSecondLargest();

        // Assert
        expect(actualSecondLargestValue).toBe(expectedSecondLargestValue);
      },
    );

    test.each([createBinarySearchTree(8)])(
      'find the third largest value after removing the second largest value',
      ({ binarySearchTree }) => {
        // Arrange
        binarySearchTree.remove(25);
        const expectedThirdLargestValue = 20;

        // Act
        const actualThirdLargestValue = binarySearchTree.findSecondLargest();

        // Assert
        expect(actualThirdLargestValue).toBe(expectedThirdLargestValue);
      },
    );

    test.each([createBinarySearchTree(8)])(
      'return undefined if search value does not exist.',
      ({ binarySearchTree }) => {
        const searchValue = 'you can not find string in bst<number>';

        // Act
        const foundNode = binarySearchTree.find(
          searchValue as unknown as number,
        );

        // Assert
        expect(foundNode).toBeUndefined();
      },
    );
  });

  describe('.prototype.isBalanced()', () => {
    /**
     * ______________20
     *
     * ________10__________30
     *
     * _____05____15____25
     *
     * __02
     *
     * _____04
     */
    function createBinarySearchTree(size: number) {
      const binarySearchTree = new BinarySearchTree();
      const values = [20, 10, 30, 5, 15, 25, 2, 4].slice(0, size);
      values.forEach((value) => {
        binarySearchTree.insert(value);
      });

      return { binarySearchTree, values };
    }

    describe('return false if tree is unbalanced', () => {
      test.each([createBinarySearchTree(8)])(
        'case 1',
        ({ binarySearchTree }) => {
          // Act
          const isBalanced = binarySearchTree.isBalanced();

          // Assert
          expect(isBalanced).toBeFalsy();
        },
      );

      test.each([createBinarySearchTree(8)])(
        'case 1',
        ({ binarySearchTree }) => {
          // Arrange
          binarySearchTree.remove(4);

          // Act
          const isBalanced = binarySearchTree.isBalanced();

          // Assert
          expect(isBalanced).toBeFalsy();
        },
      );

      test.each([createBinarySearchTree(8)])(
        'case 1',
        ({ binarySearchTree }) => {
          // Arrange
          binarySearchTree.remove(4);
          binarySearchTree.remove(15);
          binarySearchTree.remove(25);

          // Act
          const isBalanced = binarySearchTree.isBalanced();

          // Assert
          expect(isBalanced).toBeFalsy();
        },
      );
    });

    describe('return true if tree is balanced', () => {
      test.each([createBinarySearchTree(8)])(
        'case 1',
        ({ binarySearchTree }) => {
          // Arrange
          binarySearchTree.remove(2);
          binarySearchTree.remove(4);

          // Act
          const isBalanced = binarySearchTree.isBalanced();

          // Assert
          expect(isBalanced).toBeTruthy();
        },
      );

      test.each([createBinarySearchTree(8)])(
        'case 1',
        ({ binarySearchTree }) => {
          // Arrange
          binarySearchTree.remove(2);
          binarySearchTree.insert(999999);

          // Act
          const isBalanced = binarySearchTree.isBalanced();

          // Assert
          expect(isBalanced).toBeTruthy();
        },
      );
    });
  });

  describe('.prototype.breadthFirstSearch()', () => {
    test('return empty array if tree is empty', () => {
      // Arrange
      const binarySearchTree = new BinarySearchTree();
      const expectedResult: number[] = [];

      // Act
      const actualResult = binarySearchTree.breadthFirstSearch();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });

    test('return breadth first search result correctly', () => {
      // Arrange
      /**
       * ______________20
       *
       * ________10__________30
       *
       * _____05____15____25
       *
       * __02
       *
       * _____04
       */
      const binarySearchTree = new BinarySearchTree();
      [20, 10, 30, 5, 15, 25, 2, 4].forEach((value) => {
        binarySearchTree.insert(value);
      });

      const expectedResult: number[] = [20, 10, 30, 5, 15, 25, 2, 4];

      // Act
      const actualResult = binarySearchTree.breadthFirstSearch();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('.prototype.DFSPreOrder()', () => {
    test('return empty array if tree is empty', () => {
      // Arrange
      const binarySearchTree = new BinarySearchTree();
      const expectedResult: number[] = [];

      // Act
      const actualResult = binarySearchTree.DFSPreOrder();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });

    test('return depth first pre-order search result correctly', () => {
      // Arrange
      /**
       * ______________20
       *
       * ________10__________30
       *
       * _____05____15____25
       *
       * __02
       *
       * _____04
       */
      const binarySearchTree = new BinarySearchTree();
      [20, 10, 30, 5, 15, 25, 2, 4].forEach((value) => {
        binarySearchTree.insert(value);
      });

      const expectedResult: number[] = [20, 10, 5, 2, 4, 15, 30, 25];

      // Act
      const actualResult = binarySearchTree.DFSPreOrder();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('.prototype.DFSInOrder()', () => {
    test('return empty array if tree is empty', () => {
      // Arrange
      const binarySearchTree = new BinarySearchTree();
      const expectedResult: number[] = [];

      // Act
      const actualResult = binarySearchTree.DFSInOrder();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });

    test('return depth first pre-order search result correctly', () => {
      // Arrange
      /**
       * ______________20
       *
       * ________10__________30
       *
       * _____05____15____25
       *
       * __02
       *
       * _____04
       */
      const binarySearchTree = new BinarySearchTree();
      [20, 10, 30, 5, 15, 25, 2, 4].forEach((value) => {
        binarySearchTree.insert(value);
      });

      const expectedResult: number[] = [2, 4, 5, 10, 15, 20, 25, 30];

      // Act
      const actualResult = binarySearchTree.DFSInOrder();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });

  describe('.prototype.DFSPostOrder()', () => {
    test('return empty array if tree is empty', () => {
      // Arrange
      const binarySearchTree = new BinarySearchTree();
      const expectedResult: number[] = [];

      // Act
      const actualResult = binarySearchTree.DFSPostOrder();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });

    test('return depth first post-order search result correctly', () => {
      // Arrange
      /**
       * ______________20
       *
       * ________10__________30
       *
       * _____05____15____25
       *
       * __02
       *
       * _____04
       */
      const binarySearchTree = new BinarySearchTree();
      [20, 10, 30, 5, 15, 25, 2, 4].forEach((value) => {
        binarySearchTree.insert(value);
      });

      const expectedResult: number[] = [4, 2, 5, 15, 10, 25, 30, 20];

      // Act
      const actualResult = binarySearchTree.DFSPostOrder();

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });
  });
});
