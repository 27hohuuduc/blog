import { Component, Input } from '@angular/core';
import { BranchNode } from './component/base/tree-view/tree-view.component';

export class InternalBranchNode implements BranchNode {
  name?: String;
  child?: InternalBranchNode[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  map: InternalBranchNode[] = [
    { name: 'a', child: [] },
    {
      name: 'b', child: [
        { name: 'b-1', child: [] },
        {
          name: 'b-2', child: [
            { name: 'b-2-1', child: [] },
            { name: 'b-2-2', child: [] },
            { name: 'b-2-3', child: [] }
          ]
        }
      ]
    },
    {
      name: 'c', child: [
        { name: 'c-1', child: [] },
        { name: 'c-2', child: [] }
      ]
    },
  ]

  component = InternalComponent
}

@Component({
  template: '<div>{{value.name}}</div>'
})
export class InternalComponent {
  @Input()
  value!: InternalBranchNode
}