import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { TopicMap } from 'src/app/shared';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

    private subjectRoad = new Subject<TopicMap>()

    registerRoad = this.subjectRoad.pipe()

    setRoad(topic: TopicMap) {
      this.subjectRoad.next(topic)
    }

}