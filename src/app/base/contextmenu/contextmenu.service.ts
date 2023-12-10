import { Injectable } from '@angular/core';
import { ContextMenuBNode, ContextmenuComponent } from './contextmenu.component';

@Injectable({
  providedIn: 'root'
})
export class ContextmenuService {

  set(map: ContextMenuBNode[] = [], event: MouseEvent) {
    try {
      event.preventDefault()
      event.stopPropagation()
      ContextmenuComponent.contextmenu.map = map
      ContextmenuComponent.contextmenu.setPosition(event)
    }
    catch {
      throw "<app-contextmenu> not found in app-root"
    }
  }

}