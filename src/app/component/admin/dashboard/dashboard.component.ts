import { Component } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private service: CommonService) {
    service.callApi("admin/test", "GET").subscribe(value => console.log(value))
  }
}
