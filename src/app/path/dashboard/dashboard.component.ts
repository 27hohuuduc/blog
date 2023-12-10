import { Component, HostListener } from '@angular/core';
import { ContextmenuService } from 'src/app/base';
import { CommonService } from 'src/app/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(private service: CommonService, private contextService: ContextmenuService) { 

  }

  @HostListener("contextmenu", ["$event"])
  onContextMenu(event: MouseEvent) {
    undefined
  }
}
