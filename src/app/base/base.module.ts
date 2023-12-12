import { NgModule } from '@angular/core';
import { ContextmenuComponent, MenuBarComponent } from '.';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    MenuBarComponent
  ],
  imports: [
    ContextmenuComponent,
    CoreModule
  ],
  exports: [
    ContextmenuComponent,
    MenuBarComponent
  ]
})
export class BaseModule { }
