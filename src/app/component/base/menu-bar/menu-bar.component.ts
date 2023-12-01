import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BranchNode, ITreeViewComponent } from '../../core/tree-view/tree-view.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  map: InternalBranchNode[] = [
    { name: 'a' },
    {
      name: 'b', child: [
        { name: 'b-1' },
        {
          name: 'b-2', child: [
            { name: 'b-2-1' },
            { name: 'b-2-2' },
            { name: 'b-2-3' }
          ]
        }
      ]
    },
    {
      name: 'c', child: [
        { name: 'c-1' },
        { name: 'c-2' }
      ]
    },
  ]

  component = InternalComponent
}

interface InternalBranchNode extends BranchNode {
  name: string;
  child?: InternalBranchNode[];
}

@Component({
  template: '<span class="caret">{{value.name}}</span>',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true
})
class InternalComponent implements ITreeViewComponent{
  @Input()
  value!: InternalBranchNode

  constructor(private elRef: ElementRef) { }

  @HostListener("click")
  onCLick() {
    const classList = (this.elRef.nativeElement as HTMLElement).classList
    if (classList.contains("actived"))
      classList.remove("actived")

    else
      classList.add("actived")
  }

  @HostListener("contextmenu", ['$event'])
  onContextMenu(event: Event) {

    //event.preventDefault()
  }
}