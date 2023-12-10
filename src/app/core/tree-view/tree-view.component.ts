import { CommonModule } from '@angular/common';
import { Component, Injector, Input, OnInit, Type } from '@angular/core';

export interface BranchNode {
  childs?: BranchNode[]
}

export interface ITreeViewComponent {
  value: BranchNode
}

/**
 * General view tree.
 * 
 * Reference at {@link https://angular.io/api/common/NgComponentOutlet}.
 * @param map A Node array defined by {@link BranchNode}.
 * @param component Defines how nodes are generated.
 * @param className Decorative class for ul and li elements.
 * @description Inject a Component with Input property. Attention, type of value is an extended type from {@link BranchNode}.
 * @default className {ul: "ul", li: "li"}
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
  standalone: true,
  imports: [CommonModule],
  selector: 'app-base-tree-view',
  templateUrl: './tree-view.component.html'
})
export class TreeViewComponent implements OnInit {
  @Input({ required: true })
  map!: BranchNode[]

  @Input({ required: true })
  component!: Type<unknown>

  @Input()
  className: { ul: string, li: string } = { ul: "ul", li: "li" }

  inject!: Injector

  ngOnInit(): void {
    this.inject =
      Injector.create({ providers: [{ provide: this.component }] })
  }

}