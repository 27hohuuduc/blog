import { Component, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { ITreeViewComponent } from '../../core/tree-view/tree-view.component';
import { ContextmenuService } from '../contextmenu/contextmenu.service';
import { Dashboard } from 'src/app/.modules/dashboard';
import { CommonService, TopicMap, TopicMapService } from 'src/app/common.service';


@Component({
  selector: 'app-menu-bar',
  template: '<div class="container"><app-base-tree-view class="menu-bar" [map]="map" [component]="component"></app-base-tree-view></div>',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  map: TopicMap[] = []

  component = InternalComponent

  constructor(private service: TopicMapService) {
    service.register.subscribe(e => {
      this.map = e
    })
    service.init()
  }

}

@Component({
  templateUrl: './menu-bar-internal.component.html',
  styleUrls: ['./menu-bar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
class InternalComponent implements ITreeViewComponent, OnInit, OnDestroy {

  @Input()
  value!: TopicMap

  addHandle(type: "above" | "below" | "first" | "last") {
    switch (type) {
      case 'above':
        this.service.callApi<{ result: string }>("/debug", "POST", { result: "OK" })
          .subscribe(e => {
            if (e.result === "OK") {
              undefined
            }
          })
        break
      case 'below':
        this.service.callApi<{ result: string }>("/debug", "POST", { result: "OK" })
          .subscribe(e => {
            console.log(e)
          })
        break
      case 'first':
        this.service.callApi<{ result: string }>("/debug", "POST", { result: "OK" })
          .subscribe(e => {
            console.log(e)
          })
        break
      case 'last':
        this.service.callApi<{ result: string }>("/debug", "POST", { result: "OK" })
          .subscribe(e => {
            console.log(e)
          })
        break
    }
  }

  handleContextMenu = (event: MouseEvent) => {
    this.serviceContext.set(
      [
        {
          action: "Add New Path",
          childs: [
            {
              action: "On Above", click: () => {
                this.addHandle("above")
              }
            },
            {
              action: "On Below", click: () => {
                this.addHandle("above")
              }
            },
            {
              action: "At First", click: () => {
                this.addHandle("above")
              }
            },
            {
              action: "At Last", click: () => {
                this.addHandle("above")
              }
            }
          ]
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
      ], event)
  }

  private _isAdmin = false; _destroy!: Subscription

  constructor(private ref: ElementRef, private service: CommonService, private serviceContext: ContextmenuService, private dashboard: Dashboard) { }

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
  }
}