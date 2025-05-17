class BinarySearchTreeNode<T> {
  public left: BinarySearchTreeNode<T> | null = null;
  public right: BinarySearchTreeNode<T> | null = null;
  constructor(public value: T) {}
}

export class BinarySearchTree {
  public root: BinarySearchTreeNode<number> | null = null;

  public static createNode(value: number): BinarySearchTreeNode<number> {
    return new BinarySearchTreeNode(value);
  }

  public insert(value: number): this {
    const newNode = BinarySearchTree.createNode(value);

    if (!this.root) {
      this.root = newNode;
      return this;
    }

    let currentNode = this.root;
    while (value !== currentNode.value) {
      if (value < currentNode.value) {
        currentNode.left = currentNode.left ?? newNode;
        currentNode = currentNode.left;
      } else {
        currentNode.right = currentNode.right ?? newNode;
        currentNode = currentNode.right;
      }
    }

    return this;
  }

  public find(value: number): BinarySearchTreeNode<number> | undefined {
    return this.findBetter(value).foundNode ?? undefined;
  }

  public findBetter(value: number): {
    parentNode: BinarySearchTreeNode<number> | null | undefined;
    foundNode: BinarySearchTreeNode<number> | null | undefined;
    level: number;
  } {
    let previousNode: BinarySearchTreeNode<number> | null = null;
    let currentNode = this.root;
    let level = 0;
    while (currentNode && currentNode.value !== value) {
      previousNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
      level++;
    }

    return {
      foundNode: currentNode,
      parentNode: previousNode,
      level,
    };
  }

  public remove(value: number): BinarySearchTreeNode<number> | undefined {
    const { foundNode, parentNode } = this.findBetter(value);
    if (!foundNode) return undefined;

    if (foundNode.left && foundNode.right) {
      return this.removeNodeWithTwoChildren(foundNode, parentNode);
    }
    if (foundNode.left || foundNode.right) {
      return this.removeNodeWithOneChild(foundNode, parentNode);
    }
    return this.removeNodeWithNoChildren(foundNode, parentNode);
  }

  private removeNodeWithNoChildren(
    nodeToRemove: BinarySearchTreeNode<number>,
    parentNode: BinarySearchTreeNode<number> | null | undefined,
  ): BinarySearchTreeNode<number> | undefined {
    if (!parentNode) {
      this.root = null;
      return nodeToRemove;
    }

    if (parentNode.left === nodeToRemove) parentNode.left = null;
    if (parentNode.right === nodeToRemove) parentNode.right = null;

    return nodeToRemove;
  }

  private removeNodeWithOneChild(
    nodeToRemove: BinarySearchTreeNode<number>,
    parentNode: BinarySearchTreeNode<number> | null | undefined,
  ): BinarySearchTreeNode<number> | undefined {
    const childrenNode = nodeToRemove.left ?? nodeToRemove.right ?? undefined;
    if (!childrenNode) throw new Error("nodeToRemove don't have a child");

    [nodeToRemove.left, nodeToRemove.right] = [null, null];

    if (!parentNode) {
      this.root = childrenNode;
      return nodeToRemove;
    }

    if (parentNode.left === nodeToRemove) parentNode.left = childrenNode;
    if (parentNode.right === nodeToRemove) parentNode.right = childrenNode;

    return nodeToRemove;
  }

  private removeNodeWithTwoChildren(
    nodeToRemove: BinarySearchTreeNode<number>,
    parentNode: BinarySearchTreeNode<number> | null | undefined,
  ): BinarySearchTreeNode<number> | undefined {
    const { left: leftSubTree, right: rightSubTree } = nodeToRemove;
    if (!leftSubTree || !rightSubTree)
      throw new Error('subTrees can not be null');

    const smallestNodeOfRightSubTree = this.findSmallest(rightSubTree);
    if (!smallestNodeOfRightSubTree)
      throw new Error('smallestNodeOfRightSubTree can not be null');

    this.remove(smallestNodeOfRightSubTree.value);
    smallestNodeOfRightSubTree.left = leftSubTree;
    smallestNodeOfRightSubTree.right =
      smallestNodeOfRightSubTree === rightSubTree ? null : rightSubTree;
    [nodeToRemove.left, nodeToRemove.right] = [null, null];

    if (!parentNode) {
      this.root = smallestNodeOfRightSubTree;
      return nodeToRemove;
    }

    if (parentNode.left === nodeToRemove)
      parentNode.left = smallestNodeOfRightSubTree;
    if (parentNode.right === nodeToRemove)
      parentNode.right = smallestNodeOfRightSubTree;

    return nodeToRemove;
  }

  private findSmallest(
    subTreeRoot?: BinarySearchTreeNode<number> | null,
  ): BinarySearchTreeNode<number> | undefined {
    let currentNode = subTreeRoot === undefined ? this.root : subTreeRoot;

    while (currentNode?.left) {
      currentNode = currentNode.left;
    }

    return currentNode ?? undefined;
  }

  private findLargest(
    subTreeRoot?: BinarySearchTreeNode<number> | null,
  ): BinarySearchTreeNode<number> | undefined {
    let currentNode = subTreeRoot === undefined ? this.root : subTreeRoot;

    while (currentNode?.right) {
      currentNode = currentNode.right;
    }

    return currentNode ?? undefined;
  }

  public findSecondLargest(): number | undefined {
    const largestNode = this.findLargest();
    if (!largestNode) return undefined;

    const { parentNode } = this.findBetter(largestNode.value);

    const values = [
      parentNode,
      parentNode && this.findLargest(parentNode.left),
      this.findLargest(largestNode.left),
    ]
      .filter((node): node is NonNullable<typeof node> => Boolean(node))
      .map((node) => node.value)
      .reduce((reduced, current) => (reduced > current ? reduced : current));

    return values;
  }

  public isBalanced(): boolean {
    const { maximumLevel, minimumLevel } =
      this.getMinimumAndMaximumLevelOfAvailableParents();
    const isBalanced = maximumLevel - minimumLevel <= 1 ? true : false;

    return isBalanced;
  }

  private getMinimumAndMaximumLevelOfAvailableParents(
    subTreeRoot?: BinarySearchTreeNode<number> | null,
  ): {
    minimumLevel: number;
    maximumLevel: number;
  } {
    const currentNode = subTreeRoot === undefined ? this.root : subTreeRoot;
    if (!currentNode)
      return { maximumLevel: -Infinity, minimumLevel: Infinity };

    const { left: leftSubTree, right: rightSubTree, value } = currentNode;
    const currentLevel = this.findBetter(value).level;
    const leftRecursive =
      this.getMinimumAndMaximumLevelOfAvailableParents(leftSubTree);
    const rightRecursive =
      this.getMinimumAndMaximumLevelOfAvailableParents(rightSubTree);

    // inherit
    if (leftSubTree && rightSubTree) {
      return {
        maximumLevel: Math.max(
          leftRecursive.maximumLevel,
          rightRecursive.maximumLevel,
        ),
        minimumLevel: Math.min(
          leftRecursive.minimumLevel,
          rightRecursive.minimumLevel,
        ),
      };
    }
    // modify
    else {
      return {
        maximumLevel: Math.max(
          leftRecursive.maximumLevel,
          rightRecursive.maximumLevel,
          currentLevel,
        ),
        minimumLevel: Math.min(
          leftRecursive.minimumLevel,
          rightRecursive.minimumLevel,
          currentLevel,
        ),
      };
    }
  }
}
