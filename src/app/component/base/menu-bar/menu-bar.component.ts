import { Component, ElementRef, Host, HostListener, Input } from '@angular/core';
import { BranchNode } from '../../core/tree-view/tree-view.component';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  map: InternalBranchNode[] = [
    { name: 'a', child: [] },
    {
      name: 'b', child: [
        { name: 'b-1', child: [] },
        {
          name: 'b-2', child: [
            { name: 'b-2-1', child: [] },
            { name: 'b-2-2', child: [] },
            { name: 'b-2-3', child: [] }
          ]
        }
      ]
    },
    {
      name: 'c', child: [
        { name: 'c-1', child: [] },
        { name: 'c-2', child: [] }
      ]
    },
  ]

  component = InternalComponent
}

export class InternalBranchNode implements BranchNode {
  name?: String;
  child?: InternalBranchNode[];
}

@Component({
  template: '<span class="caret">{{value.name}}</span>',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true
})
export class InternalComponent {
  @Input()
  value!: InternalBranchNode

  constructor(private elRef: ElementRef) { }

  @HostListener("click")
  onCLick() {
    let classList = (this.elRef.nativeElement as HTMLElement).classList
    if (classList.contains("actived"))
      classList.remove("actived")

    else
      classList.add("actived")
  }
}