import { Component, ElementRef, HostListener, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CommonService, TopicMapService } from 'src/app/common.service';
import { ContextmenuService } from '..';
import { Dashboard, TopicMap } from 'src/app/shared';
import { ITreeViewComponent } from 'src/app/core';
import { DashboardService } from 'src/app/path';


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
        
        break
      case 'below':
        
        break
      case 'first':
        
        break
      case 'last':
        
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

  constructor(private ref: ElementRef, private service: CommonService, private serviceContext: ContextmenuService, 
    private dashboardService: DashboardService, private dashboard: Dashboard) { }

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