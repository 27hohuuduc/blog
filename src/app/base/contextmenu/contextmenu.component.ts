
import { Component, ElementRef, HostListener, Input, OnInit } from "@angular/core"
import { IconSvgComponent } from "src/app/core/icon-svg"
import { TreeViewComponent, BranchNode, ITreeViewComponent } from "src/app/core/tree-view"

@Component({
    standalone: true,
    selector: 'app-contextmenu',
    imports: [TreeViewComponent],
    template: '<app-base-tree-view class="tree-view" [map]="map" [component]="component"></app-base-tree-view>',
    styles: [':host {position: absolute;}'],
    styleUrls: ['./contextmenu.component.scss']
  })
  export class ContextmenuComponent implements OnInit {
  
    static contextmenu: ContextmenuComponent
  
    map: ContextMenuBNode[] = []
  
    component = InternalComponent
  
    constructor(private ref: ElementRef) { }
  
    setPosition(position: { x: number, y: number }) {
      const style = (this.ref.nativeElement as HTMLElement).style
      style.top = position.y + "px"
      style.left = position.x + "px"
    }
  
    ngOnInit() {
      ContextmenuComponent.contextmenu = this as ContextmenuComponent
      window.addEventListener('click', (e) => {
        if (!(this.ref.nativeElement as HTMLElement).contains(e.target as Node))
          this.map = []
      })
  
      window.addEventListener('contextmenu', () => {
        if (this.map.length != 0)
          this.map = []
      })
    }
  }
  
  export interface ContextMenuBNode extends BranchNode {
    action: string
    childs?: ContextMenuBNode[]
    click?: () => void
  }
  
  @Component({
    standalone: true,
    templateUrl: './contextmenu-internal.component.html',
    styleUrls: ['./contextmenu.component.scss'],
    imports: [IconSvgComponent]
  })
  class InternalComponent implements ITreeViewComponent {
  
    @Input()
    value!: ContextMenuBNode
  
    @HostListener("click")
    onCLick() {
      if (this.value.click) {
        this.value.click()
        ContextmenuComponent.contextmenu.map = []
      }
    }
  }