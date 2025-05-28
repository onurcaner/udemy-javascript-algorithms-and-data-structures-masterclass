/* Object.hasOwn = function (object, propertyKey): boolean {
  return object.hasOwnProperty(propertyKey);
}; */

type VertexKey = string;

export class Graph {
  public adjacencyList: Record<VertexKey, VertexKey[]> = {};

  public addVertex(vertexKey: VertexKey): this {
    if (this.doesVertexExist(vertexKey)) return this;

    this.adjacencyList[vertexKey] = [];

    return this;
  }

  public removeVertex(vertexKey: VertexKey): this {
    if (!this.doesVertexExist(vertexKey)) return this;

    this.adjacencyList[vertexKey].forEach((otherVertexKey) => {
      this.removeEdge(vertexKey, otherVertexKey);
    });

    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.adjacencyList[vertexKey];

    return this;
  }

  public addEdge(vertexKey1: VertexKey, vertexKey2: VertexKey): this {
    if (vertexKey1 === vertexKey2) return this;
    if (this.doesEdgeExistBetween(vertexKey1, vertexKey2)) return this;

    this.adjacencyList[vertexKey1].push(vertexKey2);
    this.adjacencyList[vertexKey2].push(vertexKey1);

    return this;
  }

  public removeEdge(vertexKey1: VertexKey, vertexKey2: VertexKey): this {
    if (!this.doesEdgeExistBetween(vertexKey1, vertexKey2)) return this;

    this.adjacencyList[vertexKey1] = this.adjacencyList[vertexKey1].filter(
      (vertexKey) => vertexKey !== vertexKey2,
    );
    this.adjacencyList[vertexKey2] = this.adjacencyList[vertexKey2].filter(
      (vertexKey) => vertexKey !== vertexKey1,
    );

    return this;
  }

  public depthFirstSearch(startingVertexKey: VertexKey): VertexKey[] {
    const visitedVertices: VertexKey[] = [];

    const depthFirstSearchHelper = (vertexKey: VertexKey): void => {
      if (!this.doesVertexExist(vertexKey)) return;
      if (visitedVertices.includes(vertexKey)) return;

      visitedVertices.push(vertexKey);
      this.adjacencyList[vertexKey].forEach(depthFirstSearchHelper);
    };

    depthFirstSearchHelper(startingVertexKey);

    return visitedVertices;
  }

  public breadthFirstSearch(startingVertexKey: VertexKey): VertexKey[] {
    const visitedVertices: VertexKey[] = [];

    for (
      const queueOfVerticesToVisit = [startingVertexKey];
      queueOfVerticesToVisit.length > 0;

    ) {
      const currentVertexKey = queueOfVerticesToVisit.shift();
      if (!currentVertexKey) continue;
      if (!this.doesVertexExist(currentVertexKey)) continue;

      visitedVertices.push(currentVertexKey);
      this.adjacencyList[currentVertexKey].forEach((vertexKey) => {
        if (visitedVertices.includes(vertexKey)) return;
        if (queueOfVerticesToVisit.includes(vertexKey)) return;

        queueOfVerticesToVisit.push(vertexKey);
      });
    }

    return visitedVertices;
  }

  private doesVertexExist(vertexKey: VertexKey): boolean {
    return Object.hasOwn(this.adjacencyList, vertexKey);
  }

  private doesEdgeExistBetween(
    vertexKey1: VertexKey,
    vertexKey2: VertexKey,
  ): boolean {
    if (!this.doesVertexExist(vertexKey1)) return false;
    if (!this.doesVertexExist(vertexKey2)) return false;

    if (!this.adjacencyList[vertexKey1].includes(vertexKey2)) return false;
    if (!this.adjacencyList[vertexKey2].includes(vertexKey1)) return false;

    return true;
  }
}
