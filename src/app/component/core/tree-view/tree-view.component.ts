import { Component, Injector, Input, OnInit, Type } from '@angular/core';
import { InternalBranchNode } from '../../base/menu-bar/menu-bar.component';

export interface BranchNode {
  child?: BranchNode[]
}
/**
 * General view tree.
 * 
 * Reference at {@link https://angular.io/api/common/NgComponentOutlet}
 * @description Inject a Component with Input property. Attention, type of value is an extended type from {@link BranchNode}.
 * @example
 * Component({
 * template: '<div>{{value.name}}</div>'
 * })
 * export class InternalComponent {
 *   Input()
 *   value!: InternalBranchNode
 * }
 */
@Component({
  selector: 'base-tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit {
  @Input({ required: true })
  map!: BranchNode[]

  @Input({ required: true })
  component!: Type<any>

  @Input()
  className!: {ul: string, li: string}

  inject!: Injector

  ngOnInit(): void {
    this.inject =
      Injector.create({ providers: [{ provide: this.component }] });
  }
}