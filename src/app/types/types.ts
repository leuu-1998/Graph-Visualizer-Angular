export interface NodeGraph {
  x: number;
  y: number;
}

export interface EdgeGraph {
  u: number;
  v: number;
  w: number;
}

export interface Graph {
  topNode: number;
  topEdge: number;
  isWeighted: boolean;
  isDirected: boolean;
  nodesGraph: {
    [index: string]: NodeGraph;
  };
  edgesGraph: {
    [index: string]: EdgeGraph;
  };
}
