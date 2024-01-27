import { Component, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContextmenuService } from '..';
import { Dashboard, TopicMap } from 'src/app/shared';
import { TopicMapService } from 'src/app/shared';
import { ITreeViewComponent } from 'src/app/core/tree-view';


@Component({
  selector: 'app-menu-bar',
  template: '<div class="container"><app-base-tree-view class="menu-bar" [map]="map" [component]="component"></app-base-tree-view></div>',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  map: TopicMap[] = []

  component = InternalComponent

  constructor(private service: TopicMapService) {
    service.register.topicMap.subscribe(e => {
      this.map = e
    })
    service.init()
  }

}

@Component({
  standalone: true,
  templateUrl: './menu-bar-internal.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
class InternalComponent implements ITreeViewComponent, OnInit, OnDestroy {

  @Input()
  value!: TopicMap

  addHandle(type: "above" | "below" | "inside") {
    const topic: TopicMap = {
      id: -1,
      name: "New Topic",
      childs: [],
      parent: null
    }
    switch (type) {
      case 'above':
      case 'below':
        {
          let parent = []
          if (this.value.parent == null)
            parent = this.topicService.register.topicMap.getValue()
          else
            parent = this.value.parent.childs
          let index = parent.indexOf(this.value)
          if (type === 'below')
            index += 1
          parent.splice(index, 0, topic);
        }
        break
      case 'inside':
        topic.parent = this.value
        this.value.childs.push(topic);
        break
    }
    (this.ref.nativeElement as HTMLElement).classList.add("actived")
    this.topicService.selectTopic(topic)
  }

  handleContextMenu = (event: MouseEvent) => {
    const addoptions = [
      {
        action: "Above", click: () => {
          this.addHandle("above")
        }
      },
      {
        action: "Below", click: () => {
          this.addHandle("below")
        }
      }
    ]

    if (!this.value.childs || this.value.childs.length == 0)
      addoptions.push(
        {
          action: "Inside", click: () => {
            this.addHandle("inside")
          }
        }
      )

    this.serviceContext.set(
      [
        {
          action: "Add New Path",
          childs: addoptions
        },
        {
          action: "Edit Path",
          click() {
            console.log(this.action)
          }
        },
        {
          action: "Delete Path",
          click() {
            console.log(this.action)
          }
        }
      ]
      , event)
  }

  private _isAdmin = false; _destroy!: Subscription

  constructor(private ref: ElementRef, private serviceContext: ContextmenuService,
    private topicService: TopicMapService, private dashboard: Dashboard) { }

  ngOnInit() {
    //Is Admin Mode
    const ref = (this.ref.nativeElement as HTMLElement)

    this._destroy = this.dashboard.register((data) => {
      if (data.isAdmin) {
        ref.addEventListener("contextmenu", this.handleContextMenu)
        this._isAdmin = true
      }
      else if (this._isAdmin) {
        ref.removeEventListener("contextmenu", this.handleContextMenu)
        this._isAdmin = false
      }
    })
  }

  ngOnDestroy() {
    if (this._destroy)
      this._destroy.unsubscribe()
  }

  @HostListener("click")
  onCLick() {
    const classList = (this.ref.nativeElement as HTMLElement).classList
    if (classList.contains("actived"))
      classList.remove("actived")
    else
      classList.add("actived")
    this.topicService.selectTopic(this.value)
  }
}