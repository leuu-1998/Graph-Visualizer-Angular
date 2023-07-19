import { Component, Input } from '@angular/core';
import { EdgeGraph, NodeGraph } from '../types/types';

@Component({
  selector: '[edge-graph]',
  templateUrl: './edge.component.html',
  styleUrls: ['./edge.component.css']
})
export class EdgeComponent {
  initialNodeState: NodeGraph = { x: 0, y: 0 }
  @Input() initialNode: NodeGraph = this.initialNodeState;
  @Input() finalNode: NodeGraph = this.initialNodeState;
  @Input() edge: EdgeGraph = { u: 0, v: 0, w: 0 };
  @Input() isWeighted: boolean = false;
  @Input() isDirected: boolean = false;
  @Input() isCurved: boolean = false;

  textPositionX: number = 0;
  textPositionY: number = 0;
  rotateTextAngle = 0;
  translateTextDistance: number = 0;
  liftDistance: number = -20;
  angle: number = 0;
  bezierX: number = 0;
  bezierY: number = 0;

  ngOnChanges() {
    const alfa: number = (Math.atan2(this.finalNode.y - this.initialNode.y, this.finalNode.x - this.initialNode.x) * 180) / Math.PI;
    const len = Math.sqrt((this.initialNode.x - this.finalNode.x) ** 2 + (this.initialNode.y - this.finalNode.y) ** 2);
    const isRight: boolean = this.finalNode.x > this.initialNode.x;
    const centerX: number = (this.initialNode.x + this.finalNode.x) / 2;
    const centerY: number = 5 + (this.initialNode.y + this.finalNode.y) / 2;
    const t = 0.8;
    const bezierX: number = centerX + (this.edge.u < this.edge.v ? 1 : -1) * ((isRight ? 1 : -1) * Math.min(len / 4, 50) * Math.sin((alfa * Math.PI) / 180));
    const bezierY: number = centerY + (this.edge.u < this.edge.v ? 1 : -1) * ((!isRight ? 1 : -1) * Math.min(len / 4, 50) * Math.cos((alfa * Math.PI) / 180));
    const tempX: number = (1 - t) ** 2 * this.initialNode.x + 2 * (1 - t) * t * bezierX + t ** 2 * this.finalNode.x;
    const tempY: number = (1 - t) ** 2 * this.initialNode.y + 2 * (1 - t) * t * bezierY + t ** 2 * this.finalNode.y;
    const angle: number = (Math.atan2(this.finalNode.y - tempY, this.finalNode.x - tempX) * 180) / Math.PI;

    this.bezierX = bezierX;
    this.bezierY = bezierY;
    this.translateTextDistance = -4.5 * Math.round(Math.log10(Math.abs(this.edge.w) + 1) + 1);
    this.rotateTextAngle = alfa - 180 * (isRight ? 0 : 1);
    this.textPositionX = this.isCurved ? 0.25 * this.initialNode.x + 0.5 * this.bezierX + 0.25 * this.finalNode.x : centerX;
    this.textPositionY = this.isCurved ? 0.235 * this.initialNode.y + 0.5 * this.bezierY + 0.25 * this.finalNode.y : centerY - 10;
    this.angle = this.isCurved ? angle : alfa;
    this.liftDistance = (this.isCurved && this.edge.u > this.edge.v) ? 20 : -10;
  }

}
