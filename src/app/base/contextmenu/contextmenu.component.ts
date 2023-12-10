import { CommonModule } from "@angular/common"
import { Component, ElementRef, HostListener, Input, OnInit } from "@angular/core"
import { BranchNode, ITreeViewComponent, IconSvgComponent, TreeViewComponent } from "src/app/core"

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
    imports: [CommonModule, IconSvgComponent]
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