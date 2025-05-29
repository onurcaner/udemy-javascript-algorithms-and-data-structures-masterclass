import { describe, expect, test } from 'vitest';

/* import { Graph } from './Graph'; */
import { /* Graph */ WeightedGraph } from './GraphV2';

const Graph = WeightedGraph;

describe('Graph', () => {
  test('initialization of instance', () => {
    // Arrange
    const expectedAdjacencyList = {};

    // Act
    const actualAdjacencyList = new Graph().adjacencyList;

    // Assert
    expect(actualAdjacencyList).toStrictEqual(expectedAdjacencyList);
  });

  describe('.prototype.addVertex()', () => {
    const createVertexKeys = (size: number) => {
      return { vertexKeys: ['A', 'B', 'C', 'D', 'E', 'F'].slice(0, size) };
    };

    test.each(Array.from({ length: 6 }).map((_, i) => createVertexKeys(i + 1)))(
      'add $vertexKeys into graph',
      ({ vertexKeys }) => {
        // Arrange
        const graph = new Graph();
        const expectedAdjacencyListEntries = vertexKeys.map(
          (vertexKey): [string, string[]] => [vertexKey, []],
        );
        const expectedAdjacencyList = Object.fromEntries(
          expectedAdjacencyListEntries,
        );

        // Act
        vertexKeys.forEach((vertexKey) => {
          graph.addVertex(vertexKey);
        });
        const actualAdjacencyList = graph.adjacencyList;

        // Assert
        expect(actualAdjacencyList).toEqual(expectedAdjacencyList);
      },
    );
  });

  describe('.prototype.addEdge()', () => {
    /**
     *  {
     *    'A': [],
     *    'B': [],
     *    'C': [],
     *    'D': [],
     *    'E': [],
     *    'F': [],
     *  }
     */
    const buildEmptyGraphWithVertices = () => {
      const graph = new Graph();
      const vertexKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
      vertexKeys.forEach((vertexKey) => {
        graph.addVertex(vertexKey);
      });

      return graph;
    };

    test.each([
      {
        toBeConnected: [['B', 'C']],
        expectedAdjacencyList: {
          A: [],
          B: ['C'],
          C: ['B'],
          D: [],
          E: [],
          F: [],
        },
      },
      {
        toBeConnected: [
          ['B', 'C'],
          ['D', 'B'],
        ],
        expectedAdjacencyList: {
          A: [],
          B: ['C', 'D'],
          C: ['B'],
          D: ['B'],
          E: [],
          F: [],
        },
      },
      {
        toBeConnected: [
          ['B', 'C'],
          ['D', 'B'],
          ['A', 'E'],
        ],
        expectedAdjacencyList: {
          A: ['E'],
          B: ['C', 'D'],
          C: ['B'],
          D: ['B'],
          E: ['A'],
          F: [],
        },
      },

      {
        toBeConnected: [
          ['B', 'C'],
          ['D', 'B'],
          ['A', 'E'],
          ['B', 'F'],
          ['C', 'D'],
          ['A', 'D'],
          ['F', 'D'],
        ],
        expectedAdjacencyList: {
          A: ['E', 'D'],
          B: ['C', 'D', 'F'],
          C: ['B', 'D'],
          D: ['B', 'C', 'A', 'F'],
          E: ['A'],
          F: ['B', 'D'],
        },
      },
    ])('connect $toBeConnected', ({ expectedAdjacencyList, toBeConnected }) => {
      // Arrange
      const graph = buildEmptyGraphWithVertices();

      // Act
      toBeConnected.forEach(([vertexKey1, vertexKey2]) => {
        graph.addEdge(vertexKey1, vertexKey2);
      });
      const actualAdjacencyList = graph.adjacencyList;

      // Assert
      expect(actualAdjacencyList).toEqual(expectedAdjacencyList);
    });
  });

  describe('.prototype.removeEdge()', () => {
    /**
     *  {
     *    A: ['E', 'D'],
     *    B: ['C', 'D', 'F'],
     *    C: ['B', 'D'],
     *    D: ['B', 'C', 'A', 'F'],
     *    E: ['A'],
     *    F: ['B', 'D'],
     *  }
     */
    const buildGraph = () => {
      const graph = new Graph();
      const vertexKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const edges: [string, string][] = [
        ['B', 'C'],
        ['D', 'B'],
        ['A', 'E'],
        ['B', 'F'],
        ['C', 'D'],
        ['A', 'D'],
        ['F', 'D'],
      ];

      vertexKeys.forEach((vertexKey) => {
        graph.addVertex(vertexKey);
      });
      edges.forEach(([vertexKey1, vertexKey2]) => {
        graph.addEdge(vertexKey1, vertexKey2);
      });

      return graph;
    };

    test.each([
      {
        toBeDisconnected: [['A', 'E']],
        expectedAdjacencyList: {
          A: ['D'],
          B: ['C', 'D', 'F'],
          C: ['B', 'D'],
          D: ['B', 'C', 'A', 'F'],
          E: [],
          F: ['B', 'D'],
        },
      },
      {
        toBeDisconnected: [
          ['A', 'E'],
          ['B', 'D'],
        ],
        expectedAdjacencyList: {
          A: ['D'],
          B: ['C', 'F'],
          C: ['B', 'D'],
          D: ['C', 'A', 'F'],
          E: [],
          F: ['B', 'D'],
        },
      },
      {
        toBeDisconnected: [
          ['A', 'E'],
          ['B', 'D'],
          ['C', 'D'],
        ],
        expectedAdjacencyList: {
          A: ['D'],
          B: ['C', 'F'],
          C: ['B'],
          D: ['A', 'F'],
          E: [],
          F: ['B', 'D'],
        },
      },
      {
        toBeDisconnected: [
          ['A', 'E'],
          ['B', 'D'],
          ['C', 'D'],
          ['D', 'F'],
        ],
        expectedAdjacencyList: {
          A: ['D'],
          B: ['C', 'F'],
          C: ['B'],
          D: ['A'],
          E: [],
          F: ['B'],
        },
      },
    ])(
      'disconnect $toBeDisconnected',
      ({ expectedAdjacencyList, toBeDisconnected }) => {
        // Arrange
        const graph = buildGraph();

        // Act
        toBeDisconnected.forEach(([vertexKey1, vertexKey2]) => {
          graph.removeEdge(vertexKey1, vertexKey2);
        });
        const actualAdjacencyList = graph.adjacencyList;

        // Assert
        expect(actualAdjacencyList).toEqual(expectedAdjacencyList);
      },
    );
  });

  describe('.prototype.removeVertex()', () => {
    /**
     *  {
     *    A: ['E', 'D'],
     *    B: ['C', 'D', 'F'],
     *    C: ['B', 'D'],
     *    D: ['B', 'C', 'A', 'F'],
     *    E: ['A'],
     *    F: ['B', 'D'],
     *  }
     */
    const buildGraph = () => {
      const graph = new Graph();
      const vertexKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const edges: [string, string][] = [
        ['B', 'C'],
        ['D', 'B'],
        ['A', 'E'],
        ['B', 'F'],
        ['C', 'D'],
        ['A', 'D'],
        ['F', 'D'],
      ];

      vertexKeys.forEach((vertexKey) => {
        graph.addVertex(vertexKey);
      });
      edges.forEach(([vertexKey1, vertexKey2]) => {
        graph.addEdge(vertexKey1, vertexKey2);
      });

      return graph;
    };

    test.each([
      {
        toBeRemoved: ['A'],
        expectedAdjacencyList: {
          B: ['C', 'D', 'F'],
          C: ['B', 'D'],
          D: ['B', 'C', 'F'],
          E: [],
          F: ['B', 'D'],
        },
      },
      {
        toBeRemoved: ['A', 'B'],
        expectedAdjacencyList: {
          C: ['D'],
          D: ['C', 'F'],
          E: [],
          F: ['D'],
        },
      },
      {
        toBeRemoved: ['A', 'B', 'C'],
        expectedAdjacencyList: {
          D: ['F'],
          E: [],
          F: ['D'],
        },
      },
      {
        toBeRemoved: ['A', 'B', 'C', 'D'],
        expectedAdjacencyList: {
          E: [],
          F: [],
        },
      },
    ])('remove $toBeRemoved', ({ expectedAdjacencyList, toBeRemoved }) => {
      // Arrange
      const graph = buildGraph();

      // Act
      toBeRemoved.forEach((vertexKey) => {
        graph.removeVertex(vertexKey);
      });
      const actualAdjacencyList = graph.adjacencyList;

      // Assert
      expect(actualAdjacencyList).toEqual(expectedAdjacencyList);
    });
  });

  describe('.prototype.depthFirstSearch()', () => {
    /**
     *  {
     *    A: ['E', 'D'],
     *    B: ['C', 'D', 'F'],
     *    C: ['B', 'D'],
     *    D: ['B', 'C', 'A', 'F'],
     *    E: ['A'],
     *    F: ['B', 'D'],
     *  }
     */
    const buildGraph = () => {
      const graph = new Graph();
      const vertexKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const edges: [string, string][] = [
        ['B', 'C'],
        ['D', 'B'],
        ['A', 'E'],
        ['B', 'F'],
        ['C', 'D'],
        ['A', 'D'],
        ['F', 'D'],
      ];

      vertexKeys.forEach((vertexKey) => {
        graph.addVertex(vertexKey);
      });
      edges.forEach(([vertexKey1, vertexKey2]) => {
        graph.addEdge(vertexKey1, vertexKey2);
      });

      return graph;
    };

    test.each([
      {
        startVertex: 'A',
        expectedDepthFirstSearchResult: ['A', 'E', 'D', 'B', 'C', 'F'],
      },
      {
        startVertex: 'B',
        expectedDepthFirstSearchResult: ['B', 'C', 'D', 'A', 'E', 'F'],
      },
      {
        startVertex: 'C',
        expectedDepthFirstSearchResult: ['C', 'B', 'D', 'A', 'E', 'F'],
      },
      {
        startVertex: 'D',
        expectedDepthFirstSearchResult: ['D', 'B', 'C', 'F', 'A', 'E'],
      },
    ])(
      'start from $startVertex and visit: $expectedDepthFirstSearchResult',
      ({ expectedDepthFirstSearchResult, startVertex }) => {
        // Arrange
        const graph = buildGraph();

        // Act
        const actualDepthFirstSearchResult =
          graph.depthFirstSearch(startVertex);

        // Assert
        expect(actualDepthFirstSearchResult).toStrictEqual(
          expectedDepthFirstSearchResult,
        );
      },
    );
  });

  describe('.prototype.breadthFirstSearch()', () => {
    /**
     *  {
     *    A: ['E', 'D'],
     *    B: ['C', 'D', 'F'],
     *    C: ['B', 'D'],
     *    D: ['B', 'C', 'A', 'F'],
     *    E: ['A'],
     *    F: ['B', 'D'],
     *  }
     */
    const buildGraph = () => {
      const graph = new Graph();
      const vertexKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const edges: [string, string][] = [
        ['B', 'C'],
        ['D', 'B'],
        ['A', 'E'],
        ['B', 'F'],
        ['C', 'D'],
        ['A', 'D'],
        ['F', 'D'],
      ];

      vertexKeys.forEach((vertexKey) => {
        graph.addVertex(vertexKey);
      });
      edges.forEach(([vertexKey1, vertexKey2]) => {
        graph.addEdge(vertexKey1, vertexKey2);
      });

      return graph;
    };

    test.each([
      {
        startVertex: 'A',
        expectedBreadthFirstSearchResult: ['A', 'E', 'D', 'B', 'C', 'F'],
      },
      {
        startVertex: 'B',
        expectedBreadthFirstSearchResult: ['B', 'C', 'D', 'F', 'A', 'E'],
      },
      {
        startVertex: 'C',
        expectedBreadthFirstSearchResult: ['C', 'B', 'D', 'F', 'A', 'E'],
      },
      {
        startVertex: 'D',
        expectedBreadthFirstSearchResult: ['D', 'B', 'C', 'A', 'F', 'E'],
      },
    ])(
      'start from $startVertex and visit: $expectedBreadthFirstSearchResult',
      ({ expectedBreadthFirstSearchResult, startVertex }) => {
        // Arrange
        const graph = buildGraph();

        // Act
        const actualBreadthFirstSearchResult =
          graph.breadthFirstSearch(startVertex);

        // Assert
        expect(actualBreadthFirstSearchResult).toStrictEqual(
          expectedBreadthFirstSearchResult,
        );
      },
    );
  });

  describe('.prototype.Dijkstra()', () => {
    /**
     *  {
     *    A: ['E', 'D'],
     *    B: ['C', 'D', 'F'],
     *    C: ['B', 'D'],
     *    D: ['B', 'C', 'A', 'F'],
     *    E: ['A'],
     *    F: ['B', 'D'],
     *  }
     */
    const buildWeightedGraph = () => {
      const graph = new Graph();
      const vertexKeys = ['A', 'B', 'C', 'D', 'E', 'F'];
      const edges: [string, string, number][] = [
        ['B', 'C', 1],
        ['D', 'B', 3],
        ['A', 'E', 1],
        ['B', 'F', 1],
        ['C', 'D', 1],
        ['A', 'D', 3],
        ['F', 'D', 2],
      ];

      vertexKeys.forEach((vertexKey) => {
        graph.addVertex(vertexKey);
      });
      edges.forEach(([vertexKey1, vertexKey2, distance]) => {
        graph.addEdge(vertexKey1, vertexKey2, distance);
      });

      return graph;
    };

    test('return [] if traversal is impossible', () => {
      // Arrange
      const weightedGraph = buildWeightedGraph();
      const expectedResult: string[] = [];

      // Act
      const actualResult = weightedGraph.Dijkstra('A', 'NOT-EXISTING');

      // Assert
      expect(actualResult).toStrictEqual(expectedResult);
    });

    test.each([
      {
        startingVertexKey: 'A',
        endingVertexKey: 'B',
        expectedResult: ['A', 'D', 'C', 'B'],
      },
      {
        startingVertexKey: 'B',
        endingVertexKey: 'E',
        expectedResult: ['B', 'C', 'D', 'A', 'E'],
      },
      {
        startingVertexKey: 'C',
        endingVertexKey: 'F',
        expectedResult: ['C', 'B', 'F'],
      },
      {
        startingVertexKey: 'D',
        endingVertexKey: 'B',
        expectedResult: ['D', 'C', 'B'],
      },
    ])(
      'from $startingVertexKey through $endingVertexKey, expectedResult: $expectedResult',
      ({ endingVertexKey, expectedResult, startingVertexKey }) => {
        // Arrange
        const weightedGraph = buildWeightedGraph();

        // Act
        const actualResult = weightedGraph.Dijkstra(
          startingVertexKey,
          endingVertexKey,
        );

        // Assert
        expect(actualResult).toStrictEqual(expectedResult);
      },
    );
  });
});
