import { Injectable } from '@angular/core';
import { Graph } from '../types/types';

@Injectable({
  providedIn: 'root'
})
export class UpdategraphService {

  constructor() { }

  dataGraphReducer(state: Graph, action: { name: string, payload: any }) {
    switch (action.name) {
      case 'create-node':
        return {
          ...state,
          nodesGraph: { ...state.nodesGraph, [state.topNode]: action.payload.node },
          topNode: state.topNode + 1,
        };
      case 'update-node':
        return {
          ...state,
          nodesGraph: { ...state.nodesGraph, [action.payload.id]: action.payload.node }
        };
      case 'delete-node':
        const { nodesGraph, ...restGraphWithoutNodes } = state;
        const { [action.payload]: removedNode, ...restNodes } = nodesGraph;
        return { nodesGraph: restNodes, ...restGraphWithoutNodes };
      case 'create-edge':
        return {
          ...state,
          edgesGraph: { ...state.edgesGraph, [state.topEdge]: action.payload.edge },
          topEdge: state.topEdge + 1
        };
      case 'update-edge':
        return { ...state, edgesGraph: { ...state.edgesGraph, [action.payload.id]: { ...state.edgesGraph[action.payload.id], w: action.payload.w } } };
      case 'delete-edge':
        const { edgesGraph, ...restGraphWithoutEdges } = state;
        const { [action.payload]: removedEdge, ...restEdges } = edgesGraph;
        return { edgesGraph: restEdges, ...restGraphWithoutEdges };
      case 'update-isWeight':
        return { ...state, isWeighted: !state.isWeighted };
      case 'update-isDirected':
        return { ...state, isDirected: !state.isDirected };
      default:
        return state;
    }
  }
}
