import { NgModule } from '@angular/core';
import { ContextmenuComponent, MenuBarComponent } from '.';
import { TreeViewComponent } from '../core/tree-view';

@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    ContextmenuComponent,
    TreeViewComponent
  ],
  exports: [
    ContextmenuComponent,
    MenuBarComponent
  ]
})
export class BaseModule { }
