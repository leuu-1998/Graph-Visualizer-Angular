import { Component, Input } from '@angular/core';
import { NodeGraph } from '../types/types';

@Component({
  selector: '[edge-graph]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent {
  initialNodeState: NodeGraph = { x: 0, y: 0 }
  @Input() initialNode: NodeGraph = this.initialNodeState;
  @Input() finalNode: NodeGraph = this.initialNodeState;
  @Input() isWeighted: boolean = false;
  @Input() isDirected: boolean = false;
  @Input() w: number = 0;

  textPositionX: number = 0;
  textPositionY: number = 0;
  rotateTextAngle = 0;
  translateTextDistance: number = 0;
  liftDistance: number = -20;
  alfa: number = 0;

  ngOnChanges() {
    const alfa: number = (Math.atan2(this.finalNode.y - this.initialNode.y, this.finalNode.x - this.initialNode.x) * 180) / Math.PI;
    const isRight: boolean = this.finalNode.x > this.initialNode.x;

    this.translateTextDistance = -4.5 * Math.round(Math.log10(Math.abs(this.w) + 1) + 1);
    this.rotateTextAngle = alfa - 180 * (isRight ? 0 : 1);
    this.textPositionX = (this.initialNode.x + this.finalNode.x) / 2;
    this.textPositionY = -8 + (this.initialNode.y + this.finalNode.y) / 2;
    this.alfa = alfa;
  }

}
