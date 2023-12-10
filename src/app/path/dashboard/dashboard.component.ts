import { Component, HostListener } from '@angular/core';
import { CommonService, TopicMapService } from 'src/app/common.service';
import { ContextmenuService } from 'src/app/base/contextmenu/contextmenu.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private service: CommonService, private TopicMapService: ContextmenuService) { 

  }

  @HostListener("contextmenu", ["$event"])
  onContextMenu(event: MouseEvent) {
    undefined
  }
}
