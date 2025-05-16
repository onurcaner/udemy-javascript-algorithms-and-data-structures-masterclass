class BinarySearchTreeNode<T = number> {
  public left: BinarySearchTreeNode<T> | null = null;
  public right: BinarySearchTreeNode<T> | null = null;
  constructor(public value: T) {}
}

export class BinarySearchTree<T = number> {
  public root: BinarySearchTreeNode<T> | null = null;

  public static createNode<T>(value: T): BinarySearchTreeNode<T> {
    return new BinarySearchTreeNode(value);
  }

  public insert(value: T): this {
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

  public find(value: T): BinarySearchTreeNode<T> | undefined {
    return this.findBetter(value).foundNode ?? undefined;
  }

  public findBetter(
    value: T,
  ): Record<
    'parentNode' | 'foundNode',
    BinarySearchTreeNode<T> | null | undefined
  > {
    let previousNode: BinarySearchTreeNode<T> | null = null;
    let currentNode = this.root;
    while (currentNode && currentNode.value !== value) {
      previousNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
      } else {
        currentNode = currentNode.right;
      }
    }

    return {
      foundNode: currentNode,
      parentNode: previousNode,
    };
  }

  public remove(value: T): BinarySearchTreeNode<T> | undefined {
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
    nodeToRemove: BinarySearchTreeNode<T>,
    parentNode: BinarySearchTreeNode<T> | null | undefined,
  ): BinarySearchTreeNode<T> | undefined {
    if (!parentNode) {
      this.root = null;
      return nodeToRemove;
    }

    if (parentNode.left === nodeToRemove) parentNode.left = null;
    if (parentNode.right === nodeToRemove) parentNode.right = null;

    return nodeToRemove;
  }

  private removeNodeWithOneChild(
    nodeToRemove: BinarySearchTreeNode<T>,
    parentNode: BinarySearchTreeNode<T> | null | undefined,
  ): BinarySearchTreeNode<T> | undefined {
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
    nodeToRemove: BinarySearchTreeNode<T>,
    parentNode: BinarySearchTreeNode<T> | null | undefined,
  ): BinarySearchTreeNode<T> | undefined {
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
    subTreeRoot?: BinarySearchTreeNode<T> | null,
  ): BinarySearchTreeNode<T> | undefined {
    let currentNode = subTreeRoot === undefined ? this.root : subTreeRoot;

    while (currentNode?.left) {
      currentNode = currentNode.left;
    }

    return currentNode ?? undefined;
  }
}
