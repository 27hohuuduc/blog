import { Component, ElementRef, HostListener, Injectable, Input, OnInit } from '@angular/core';
import { BranchNode, ITreeViewComponent, TreeViewComponent } from '../../component/core/tree-view/tree-view.component';
import { IconSvgComponent } from '../../component/core/icon-svg/icon-svg.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
let contextmenu!: ContextmenuComponent

@Injectable({
  providedIn: 'root'
})
export class ContextmenuService {

  set(map: ContextMenuBNode[] = [], position: { x: number, y: number } | MouseEvent) {
    try {
      contextmenu.map = map
      contextmenu.setPosition(position)
    }
    catch {
      throw "<app-contextmenu> not found in app-root"
    }
  }

}

@Component({
  standalone: true,
  selector: 'app-contextmenu',
  imports: [TreeViewComponent],
  template: '<app-base-tree-view class="tree-view" [map]="map" [component]="component" [rootHandle]="true"></app-base-tree-view>',
  styles: [':host {position: absolute;}'],
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent implements OnInit {

  map: ContextMenuBNode[] = []

  component = InternalComponent

  constructor(private ref: ElementRef) { }

  setPosition(position: {x: number, y: number}) {
    const style = (this.ref.nativeElement as HTMLElement).style
    style.top = position.y + "px"
    style.left = position.x + "px"
  }

  ngOnInit() {
    contextmenu = this as ContextmenuComponent
    window.addEventListener('click', (e) => {
      if (!(this.ref.nativeElement as HTMLElement).contains(e.target as Node))
        undefined
    })
  }
}

export interface ContextMenuBNode extends BranchNode {
  action: string
  childs?: ContextMenuBNode[];
}

@Component({
  standalone: true,
  templateUrl: './contextmenu-internal.component.html',
  styleUrls: ['./contextmenu.component.scss'],
  imports: [CommonModule, IconSvgComponent]
})
class InternalComponent implements ITreeViewComponent, OnInit {

  @Input()
  value!: { node: ContextMenuBNode, parentRef: HTMLLIElement, hook: Observable<void> }

  ulRef!: HTMLUListElement

  constructor(private ref: ElementRef) { }

  ngOnInit() {
    const childs = this.value.node.childs
    if (childs && childs.length != 0) {
      this.value.hook.subscribe(() => {
        const childs = this.value.parentRef.childNodes
        for (let i = 0; i < childs.length; i++) {
          if (childs[i].nodeName === "UL") {
            this.ulRef = (childs[i] as HTMLUListElement)
            return
          }
        }
      })
      const ref = (this.ref.nativeElement as HTMLElement)
      ref.addEventListener("mouseenter", () => {
        if (this.ulRef)
          (this.ulRef as HTMLUListElement).classList.add('ul-hover')
      })
      ref.addEventListener("mouseleave", () => {
        if (this.ulRef)
          (this.ulRef as HTMLUListElement).classList.remove('ul-hover')
      })
    }
  }

  @HostListener("click")
  onCLick() {
    console.log(this.value)
    // const classList = (this.elRef.nativeElement as HTMLElement).classList
    // if (classList.contains("actived"))
    //   classList.remove("actived")

    // else
    //   classList.add("actived")
  }
}