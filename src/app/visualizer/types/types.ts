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

export interface CreateNodePayload {
  node: NodeGraph;
}

export interface UpdateNodePayload {
  id: number;
  node: NodeGraph;
}

export interface CreateEdgePayload {
  edge: EdgeGraph;
}

export interface UpdateEdgePayload {
  id: number;
  w: number;
}
