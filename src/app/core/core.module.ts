import { NgModule } from '@angular/core';
import { EditorComponent, IconSvgComponent, TreeViewComponent } from '.';
import { LineComponent } from './editer/line/line.component';



@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    TreeViewComponent,
    IconSvgComponent,
    LineComponent
  ],
  exports: [
    TreeViewComponent,
    IconSvgComponent,
    EditorComponent
  ]
})
export class CoreModule { }
