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

  verifyAndCreateEdge(id: string): void {
    if (this.idFirstNodeToCreateEdge == - 1) {
      this.idFirstNodeToCreateEdge = +id;
    } else {
      if (this.idFirstNodeToCreateEdge === +id) {
        //not create edge, since the initial and final node are the same
        return;
      }
      if (!this.graphState.isDirected && (this.updateGraphService.findEdge(this.graphState, this.idFirstNodeToCreateEdge, +id) || this.updateGraphService.findEdge(this.graphState, +id, this.idFirstNodeToCreateEdge))) {
        //is no directed and already has the edge
        return;
      }
      if (this.graphState.isDirected && this.updateGraphService.findEdge(this.graphState, this.idFirstNodeToCreateEdge, +id)) {
        //is directed and already has the edge
        return;
      }
      this.graphState = this.updateGraphService.createEdge(this.graphState, { edge: { u: this.idFirstNodeToCreateEdge, v: +id, w: 1 } });
      this.idFirstNodeToCreateEdge = -1;
    }
  }

  verifyIsCurvedConditionForEdge(key: string) {
    return this.updateGraphService.findEdge(this.graphState, this.graphState.edgesGraph[key].v, this.graphState.edgesGraph[key].u);
  }

  onConfirmUpdateEdge(event: SubmitEvent, newWeight: string): void {
    event.preventDefault();
    this.graphState = this.updateGraphService.updateEdge(this.graphState, { id: this.idCurrentEdge, w: +newWeight });
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
      this.graphState = this.updateGraphService.createNode(this.graphState, { node: { x: offsetX, y: offsetY } });
    }
  }

  onMouseMoveOnSvg(event: MouseEvent): void {
    const { offsetX, offsetY } = event;
    if (this.moveState == true) {
      this.graphState = this.updateGraphService.updateNode(this.graphState, { id: this.idCurrentNode, node: { x: offsetX, y: offsetY } });
    }
  }

  onMouseDownOnNode(event: MouseEvent, id: string): void {
    if (event.ctrlKey) {
      this.graphState = this.updateGraphService.deleteNode(this.graphState, id);
      return;
    }
    if (event.altKey) {
      this.verifyAndCreateEdge(id);
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
    this.graphState = this.updateGraphService.updateIsWeighted(this.graphState);
  }

  onChangeDirectedState(): void {
    this.graphState = this.updateGraphService.updateIsDirected(this.graphState);
  }
}
