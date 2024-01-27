import { NgModule } from '@angular/core';
import { ContextmenuComponent, MenuBarComponent } from '.';
import { TreeViewComponent } from '../core/tree-view';
import { OverlayComponent } from './overlay/overlay.component';

@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    ContextmenuComponent,
    TreeViewComponent,
    OverlayComponent
  ],
  exports: [
    ContextmenuComponent,
    MenuBarComponent,
    OverlayComponent
  ]
})
export class BaseModule { }
