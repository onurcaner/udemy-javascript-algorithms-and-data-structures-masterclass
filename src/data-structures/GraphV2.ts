/* Array.prototype.at = function (index) {
  let actualIndex = index;
  while (actualIndex < 0) {
    actualIndex += this.length;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return this[actualIndex];
}; */

type VertexKey = string;

interface Adjacency {
  getVertexKey: () => VertexKey;
  getDistance: () => number;
}

class UnweightedAdjacency implements Adjacency {
  constructor(private key: VertexKey) {}

  public getVertexKey() {
    return this.key;
  }
  public getDistance() {
    return 0;
  }
}

class WeightedAdjacency implements Adjacency {
  constructor(
    private key: VertexKey,
    private distance: number,
  ) {}

  public getVertexKey() {
    return this.key;
  }
  public getDistance() {
    return this.distance;
  }
}

export class Graph {
  protected adjacenciesMap = new Map<VertexKey, Adjacency[]>();

  constructor(
    protected adjacencyBuilder: (
      key: VertexKey,
      distance?: number,
    ) => Adjacency = (key) => new UnweightedAdjacency(key),
  ) {}

  public get adjacencyList(): Record<string, string[]> {
    return Object.fromEntries(
      [...this.adjacenciesMap.entries()].map(([vertexKey, adjacencies]) => [
        vertexKey,
        adjacencies.map((adjacency) => adjacency.getVertexKey()),
      ]),
    );
  }

  protected buildAdjacency(vertexKey: VertexKey, distance?: number): Adjacency {
    return this.adjacencyBuilder(vertexKey, distance);
  }

  public addVertex(vertexKey: VertexKey): this {
    if (this.adjacenciesMap.get(vertexKey)) return this;

    this.adjacenciesMap.set(vertexKey, []);

    return this;
  }

  public removeVertex(vertexKey: VertexKey): this {
    const adjacenciesOfVertex = this.adjacenciesMap.get(vertexKey);
    if (!adjacenciesOfVertex) return this;

    adjacenciesOfVertex.forEach((adjacency) => {
      this.removeEdge(vertexKey, adjacency.getVertexKey());
    });

    this.adjacenciesMap.delete(vertexKey);

    return this;
  }

  public addEdge(
    vertexKey1: VertexKey,
    vertexKey2: VertexKey,
    distance?: number,
  ): this {
    if (vertexKey1 === vertexKey2) return this;
    if (this.areAdjacent(vertexKey1, vertexKey2)) return this;

    const adjacenciesOfVertex1 = this.adjacenciesMap.get(vertexKey1);
    const adjacenciesOfVertex2 = this.adjacenciesMap.get(vertexKey2);
    if (!adjacenciesOfVertex1 || !adjacenciesOfVertex2) return this;

    adjacenciesOfVertex1.push(this.buildAdjacency(vertexKey2, distance));
    adjacenciesOfVertex2.push(this.buildAdjacency(vertexKey1, distance));

    return this;
  }

  public removeEdge(vertexKey1: VertexKey, vertexKey2: VertexKey): this {
    if (!this.areAdjacent(vertexKey1, vertexKey2)) return this;

    const adjacenciesOfVertex1 = this.adjacenciesMap.get(vertexKey1);
    const adjacenciesOfVertex2 = this.adjacenciesMap.get(vertexKey2);
    if (!adjacenciesOfVertex1 || !adjacenciesOfVertex2) return this;

    this.adjacenciesMap.set(
      vertexKey1,
      adjacenciesOfVertex1.filter(
        (adjacency) => adjacency.getVertexKey() !== vertexKey2,
      ),
    );
    this.adjacenciesMap.set(
      vertexKey2,
      adjacenciesOfVertex2.filter(
        (adjacency) => adjacency.getVertexKey() !== vertexKey1,
      ),
    );

    return this;
  }

  public depthFirstSearch(startingVertexKey: VertexKey): VertexKey[] {
    const visitedVertices: VertexKey[] = [];

    const depthFirstSearchHelper = (vertexKey: VertexKey): void => {
      if (visitedVertices.includes(vertexKey)) return;

      const adjacencies = this.adjacenciesMap.get(vertexKey);
      if (!adjacencies) return;

      visitedVertices.push(vertexKey);
      adjacencies
        .map((adjacency) => adjacency.getVertexKey())
        .forEach(depthFirstSearchHelper);
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

      const adjacenciesOfCurrentVertex =
        this.adjacenciesMap.get(currentVertexKey);
      if (!adjacenciesOfCurrentVertex) continue;

      visitedVertices.push(currentVertexKey);
      adjacenciesOfCurrentVertex.forEach((adjacency) => {
        if (visitedVertices.includes(adjacency.getVertexKey())) return;
        if (queueOfVerticesToVisit.includes(adjacency.getVertexKey())) return;

        queueOfVerticesToVisit.push(adjacency.getVertexKey());
      });
    }

    return visitedVertices;
  }

  protected areAdjacent(vertexKey1: VertexKey, vertexKey2: VertexKey): boolean {
    const adjacenciesOfVertex1 = this.adjacenciesMap.get(vertexKey1);
    const adjacenciesOfVertex2 = this.adjacenciesMap.get(vertexKey2);

    if (!adjacenciesOfVertex1) return false;
    if (!adjacenciesOfVertex2) return false;

    if (
      !adjacenciesOfVertex1
        .map((adjacency) => adjacency.getVertexKey())
        .includes(vertexKey2)
    )
      return false;
    if (
      !adjacenciesOfVertex2
        .map((adjacency) => adjacency.getVertexKey())
        .includes(vertexKey1)
    )
      return false;

    return true;
  }
}

export class WeightedGraph extends Graph {
  constructor() {
    super((key, distance) => new WeightedAdjacency(key, distance ?? 1));
  }

  public Dijkstra(
    startingVertexKey: VertexKey,
    endingVertexKey: VertexKey,
  ): VertexKey[] {
    const visitedVertices: VertexKey[] = [];
    const verticesToVisit: VertexKey[] = [startingVertexKey];
    const bestPreviousVertexMap = new Map<VertexKey, VertexKey>();
    const shortestDistanceFromStartMap = new Map<VertexKey, number>([
      [startingVertexKey, 0],
    ]);

    while (verticesToVisit.length > 0) {
      const currentVertexKey = verticesToVisit.shift();
      if (!currentVertexKey) break;

      // Visit
      visitedVertices.push(currentVertexKey);
      if (currentVertexKey === endingVertexKey) break;

      const adjacenciesOfCurrentVertex =
        this.adjacenciesMap.get(currentVertexKey);
      if (!adjacenciesOfCurrentVertex) continue;

      // Peek adjacent vertices and register their distances
      adjacenciesOfCurrentVertex.forEach((adjacency) => {
        const peekedVertexKey = adjacency.getVertexKey();
        if (visitedVertices.includes(peekedVertexKey)) return;

        const currentVertexDistance =
          shortestDistanceFromStartMap.get(currentVertexKey);
        if (currentVertexDistance === undefined) throw new Error();

        const oldPeekedVertexDistance =
          shortestDistanceFromStartMap.get(peekedVertexKey) ?? Infinity;
        const newPeekedVertexDistance =
          currentVertexDistance + adjacency.getDistance();
        if (newPeekedVertexDistance >= oldPeekedVertexDistance) return;

        shortestDistanceFromStartMap.set(
          peekedVertexKey,
          newPeekedVertexDistance,
        );
        bestPreviousVertexMap.set(peekedVertexKey, currentVertexKey);
      });

      // Queue adjacent vertices for future visit
      adjacenciesOfCurrentVertex.forEach((adjacency) => {
        const vertexKey = adjacency.getVertexKey();

        if (visitedVertices.includes(vertexKey)) return;
        if (verticesToVisit.includes(vertexKey)) return;

        verticesToVisit.push(vertexKey);
        verticesToVisit.sort((leftVertex, rightVertex): number => {
          const totalDistanceOfLeftVertex =
            shortestDistanceFromStartMap.get(leftVertex);
          const totalDistanceOfRightVertex =
            shortestDistanceFromStartMap.get(rightVertex);

          if (
            totalDistanceOfLeftVertex === undefined ||
            totalDistanceOfRightVertex === undefined
          )
            throw new Error('Peek stage is not correctly implemented');
          return totalDistanceOfLeftVertex - totalDistanceOfRightVertex;
        });
      });
    }

    const shortestPath: VertexKey[] = [endingVertexKey];
    while (!shortestPath.includes(startingVertexKey)) {
      const lastVertexKey = shortestPath.at(-1);
      if (lastVertexKey === undefined) return [];

      const nextVertexKey = bestPreviousVertexMap.get(lastVertexKey);
      if (nextVertexKey === undefined) return [];

      shortestPath.push(nextVertexKey);
    }

    return shortestPath.reverse();
  }
}
