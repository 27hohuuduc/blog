import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { BranchNode, ITreeViewComponent } from '../tree-view/tree-view.component';

@Component({
  selector: 'app-contextmenu',
  templateUrl: './contextmenu.component.html',
  styleUrls: ['./contextmenu.component.scss']
})
export class ContextmenuComponent {
  map: InternalBranchNode[] = [
    {
      action: "Action1",
      child: [
        {
          action: "Action1=1"
        },
        {
          action: "Action1=2",
          child: [
            {
              action: "Action1=2-1"
            }
          ]
        }
      ]
    },
    {
      action: "Action2"
    },
    {
      action: "Action3"
    }
  ]

  component = InternalComponent
}

interface InternalBranchNode extends BranchNode {
  action: string
  child?: InternalBranchNode[];
}

@Component({
  template: '<span class="caret">{{value.action}}</span>',
  styleUrls: ['./contextmenu.component.scss'],
  standalone: true
})
class InternalComponent implements ITreeViewComponent {
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
}