import { Component, Injector, Input, OnInit, Type } from '@angular/core';

export interface BranchNode {
  child?: BranchNode[]
}

export interface ITreeViewComponent {
  value: BranchNode
}
/**
 * General view tree.
 * 
 * Reference at {@link https://angular.io/api/common/NgComponentOutlet}
 * @description Inject a Component with Input property. Attention, type of value is an extended type from {@link BranchNode}.
 * @example
 * interface InternalBranchNode extends BranchNode {
 *  name: string;
 *  child?: InternalBranchNode[];
 * }
 * Component({
 *  template: '<div>{{value.name}}</div>'
 * })
 * export class InternalComponent implements ITreeViewComponent {
 *   Input()
 *   value!: InternalBranchNode
 * }
 */
@Component({
  selector: 'app-base-tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit {
  @Input({ required: true })
  map!: BranchNode[]

  @Input({ required: true })
  component!: Type<unknown>

  @Input()
  className!: {ul: string, li: string}

  inject!: Injector

  ngOnInit(): void {
    this.inject =
      Injector.create({ providers: [{ provide: this.component }] });
  }
}