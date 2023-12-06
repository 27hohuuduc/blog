import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { BranchNode, ITreeViewComponent } from '../../core/tree-view/tree-view.component';
import { ContextmenuService } from '../../../service/contextmenu/contextmenu.service';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  map: InternalBranchNode[] = [
    { name: 'a' },
    {
      name: 'b', childs: [
        { name: 'b-1' },
        {
          name: 'b-2', childs: [
            { name: 'b-2-1' },
            { name: 'b-2-2' },
            { name: 'b-2-3' }
          ]
        }
      ]
    },
    {
      name: 'c', childs: [
        { name: 'c-1' },
        { name: 'c-2' }
      ]
    },
  ]

  component = InternalComponent

}

interface InternalBranchNode extends BranchNode {
  name: string;
  childs?: InternalBranchNode[];
}

@Component({
  template: '<span class="caret">{{value.name}}</span>',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true
})
class InternalComponent implements ITreeViewComponent, OnInit {
  @Input()
  value!: InternalBranchNode

  private _isAdmin = false

  constructor(private ref: ElementRef, private service: ContextmenuService, private router: Router) { }

  ngOnInit() {
    //Is Admin Mode
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationEnd) {
        this._isAdmin = (event.snapshot.data as {isAdmin: boolean}).isAdmin
        console.log(this._isAdmin)
      }
    })
  }

  @HostListener("click")
  onCLick() {
    const classList = (this.ref.nativeElement as HTMLElement).classList
    if (classList.contains("actived"))
      classList.remove("actived")

    else
      classList.add("actived")
  }

  @HostListener("contextmenu", ['$event'])
  onContextMenu(event: MouseEvent) {
    this.service.set([{ action: this.value.name + " action" }], event)
    event.preventDefault()
  }
}