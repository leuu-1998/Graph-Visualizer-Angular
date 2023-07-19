import { Injectable } from '@angular/core';
import { CreateEdgePayload, CreateNodePayload, Graph, UpdateEdgePayload, UpdateNodePayload } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class UpdategraphService {

  constructor() { }

  createNode(state: Graph, payload: CreateNodePayload): Graph {
    return {
      ...state,
      nodesGraph: { ...state.nodesGraph, [state.topNode]: payload.node },
      topNode: state.topNode + 1,
    };
  }

  updateNode(state: Graph, payload: UpdateNodePayload): Graph {
    return {
      ...state,
      nodesGraph: { ...state.nodesGraph, [payload.id]: payload.node }
    };
  }

  deleteNode(state: Graph, id: string): Graph {
    Object.entries(state.edgesGraph).forEach((element) => {
      const [key, edge] = element;
      if (edge.u == +id || edge.v == +id) {
        state = this.deleteEdge(state, key);
      }
    });

    const { nodesGraph, ...restGraphWithoutNodes } = state;
    const { [id]: removedNode, ...restNodes } = nodesGraph;
    return { nodesGraph: restNodes, ...restGraphWithoutNodes };
  }

  createEdge(state: Graph, payload: CreateEdgePayload): Graph {
    return {
      ...state,
      edgesGraph: { ...state.edgesGraph, [state.topEdge]: payload.edge },
      topEdge: state.topEdge + 1
    };
  }

  updateEdge(state: Graph, payload: UpdateEdgePayload): Graph {
    return {
      ...state,
      edgesGraph: {
        ...state.edgesGraph,
        [payload.id]: {
          ...state.edgesGraph[payload.id],
          w: payload.w
        }
      }
    };
  }

  deleteEdge(state: Graph, id: string): Graph {
    const { edgesGraph, ...restGraphWithoutEdges } = state;
    const { [id]: removedEdge, ...restEdges } = edgesGraph;
    return { edgesGraph: restEdges, ...restGraphWithoutEdges };
  }

  updateIsWeighted(state: Graph) {
    return { ...state, isWeighted: !state.isWeighted };
  }

  updateIsDirected(state: Graph) {
    return { ...state, isDirected: !state.isDirected };
  }

  findEdge(state: Graph, u: number, v: number) {
    if (Object.values(state.edgesGraph).find((edge) => edge.u === u && edge.v === v) === undefined) {
      return false;
    }
    return true;
  }
}
