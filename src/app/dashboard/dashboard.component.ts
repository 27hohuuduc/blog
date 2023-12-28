import { Component } from '@angular/core';
import { TopicMap, TopicMapService } from '../shared';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private service: TopicMapService) {
    service.register.selectedTopic.subscribe(x => {
      let next:TopicMap | null = x, s = ""
      do {
        s = s + "/" + x.name
        next = next?.parent
      } while(next)

      console.log(s)
    })
  }
}
