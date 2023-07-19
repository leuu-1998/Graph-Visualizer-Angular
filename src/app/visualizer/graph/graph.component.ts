import { Component } from '@angular/core';
import { Graph } from '../types/types';
import { UpdategraphService } from '../services/updategraph.service';

@Component({
  selector: 'graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  Object = Object;
  moveState: boolean = false;
  showInputToEditEdge: boolean = false;
  idCurrentEdge: number = -1;
  idCurrentNode: number = -1;
  idFirstNodeToCreateEdge: number = -1;
  isCurved: boolean = false;
  graphState: Graph = { topNode: 0, topEdge: 0, isWeighted: true, isDirected: true, edgesGraph: {}, nodesGraph: {} };

  constructor(private readonly updateGraphService: UpdategraphService) { }

  updateNode(x: number, y: number): void {
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'update-node',
      payload: { id: this.idCurrentNode, node: { x: x, y: y } }
    });
  }

  createNode(x: number, y: number): void {
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'create-node',
      payload: { node: { x: x, y: y } }
    });
  }

  deleteEdge(id: string): void {
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'delete-edge',
      payload: id
    });
  }

  deleteNode(id: string): void {
    Object.entries(this.graphState.edgesGraph).forEach((element) => {
      const [key, edge] = element;
      if (edge.u == +id || edge.v == +id) {
        this.deleteEdge(key);
      }
    });
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'delete-node',
      payload: id
    });
  }

  findEdge(u: number, v: number) {
    if (Object.values(this.graphState.edgesGraph).find((edge) => edge.u === u && edge.v === v) === undefined) {
      return false;
    }
    return true;
  }

  createEdge(id: string): void {
    if (this.idFirstNodeToCreateEdge == - 1) {
      this.idFirstNodeToCreateEdge = +id;
    } else {
      if (this.idFirstNodeToCreateEdge === +id) {
        //not create edge, since the initial and final node are the same
        return;
      }
      if (!this.graphState.isDirected && (this.findEdge(this.idFirstNodeToCreateEdge, +id) || this.findEdge(+id, this.idFirstNodeToCreateEdge))) {
        //is no directed and already has the edge
        return;
      }
      if (this.graphState.isDirected && this.findEdge(this.idFirstNodeToCreateEdge, +id)) {
        //is directed and already has the edge
        return;
      }
      this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
        name: 'create-edge',
        payload: { edge: { u: this.idFirstNodeToCreateEdge, v: +id, w: 1 } }
      });
      this.idFirstNodeToCreateEdge = -1;
    }
  }

  updateEdge(newWeight: number) {
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'update-edge',
      payload: { id: this.idCurrentEdge, w: newWeight }
    })
  }

  onConfirmUpdateEdge(event: SubmitEvent, newWeight: string): void {
    event.preventDefault();
    this.updateEdge(+newWeight);
    this.idCurrentEdge = -1;
    this.showInputToEditEdge = false;
  }

  onDoubleClickOnEdge(id: string): void {
    this.showInputToEditEdge = true;
    this.idCurrentEdge = +id;
  }

  onMouseClickOnSvg(event: MouseEvent): void {
    const { offsetX, offsetY } = event;
    if (event.button == 0 && event.shiftKey) {
      this.createNode(offsetX, offsetY);
    }
  }

  onMouseMoveOnSvg(event: MouseEvent): void {
    const { offsetX, offsetY } = event;
    if (this.moveState == true) {
      this.updateNode(offsetX, offsetY);
    }
  }

  onMouseDownOnNode(event: MouseEvent, id: string): void {
    if (event.ctrlKey) {
      this.deleteNode(id);
      return;
    }
    if (event.altKey) {
      this.createEdge(id);
      return;
    }
    this.idCurrentNode = +id;
    this.moveState = true;
  }

  onMouseUpOnNode(): void {
    this.moveState = false;
    this.idCurrentNode = -1;
  }

  onChangeWeightState(): void {
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'update-isWeight',
      payload: {}
    });
  }

  onChangeDirectedState(): void {
    this.graphState = this.updateGraphService.dataGraphReducer(this.graphState, {
      name: 'update-isDirected',
      payload: {}
    });
  }
}
