import { Component, Input } from '@angular/core';

@Component({
  selector: '[node-graph]',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.css']
})
export class NodeComponent {
  @Input() key: string = '';
}
