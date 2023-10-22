import { Component, Directive, ElementRef, Injector, Input, OnInit, TemplateRef, Type, ViewChild } from '@angular/core';
import { InternalBranchNode, InternalComponent } from 'src/app/app.component';

export interface BranchNode {
  child?: BranchNode[]
}
/**
 * General view tree
 * 
 * Reference at {@link https://angular.io/api/common/NgComponentOutlet}
 */
@Component({
  selector: 'base-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {
  @Input({ required: true })
  map!: BranchNode[]

  @Input({ required: true })
  component!: Type<any>

  inject!: Injector

  constructor(injector: Injector) {
    this.inject =
        Injector.create({providers: [{provide: InternalComponent}]});
  }
}