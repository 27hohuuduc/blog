import { Component, HostBinding, HostListener, OnDestroy } from '@angular/core';
import { TopicMap, TopicMapService } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy {

  @HostBinding("attr.tabindex") tabindex = -1

  path: TopicMap[] = []

  target!: TopicMap

  constructor(private service: TopicMapService) {
    service.register.selectedTopic.subscribe(x => {
      this.target = x
      this.path = []
      let next: TopicMap | null = x.parent
      while (next) {
        this.path.unshift(next)
        next = next.parent
      }
    })
  }

  @HostListener("keydown", ["$event"])
  onKeyDown(e: KeyboardEvent) {
    const eObj = window.event ? window.event as KeyboardEvent : e
    if (eObj.key !== "s" || !eObj.ctrlKey)
      return
    eObj.preventDefault()
    //anything
  }

  onChange(e: Event) {
    this.target.name = (e.target as HTMLInputElement).value
  }

  ngOnDestroy() {
    this.service.init()
  }
}
