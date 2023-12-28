import { Injectable } from '@angular/core';
import { ApiService, TopicMap } from '..';
import { BehaviorSubject } from 'rxjs';

type Topics = {
  id: number
  topic: string,
  parentId: number
}

const topicTnit: TopicMap = {
  id: 0,
  name: "Tạo mới",
  childs: [],
  parent: null
}

@Injectable({
  providedIn: 'root'
})
export class TopicMapService {

  private bsTopicMap = new BehaviorSubject<TopicMap[]>([])
  private bsSelectedTopic = new BehaviorSubject<TopicMap>(topicTnit)

  constructor(private service: ApiService) { }

  register = {
    topicMap: this.bsTopicMap,
    selectedTopic: this.bsSelectedTopic
  }

  init() {
    this.service.callApi<Topics[]>("debug", "POST", [
      {
        id: 1,
        topic: "Home"
      },
      {
        id: 2,
        topic: "Test1",
      },
      {
        id: 3,
        topic: "Test1-1",
        parentId: 2
      },
      {
        id: 5,
        topic: "Test1-2",
        parentId: 2
      },
      {
        id: 6,
        topic: "Test1-2-1",
        parentId: 5
      },
      {
        id: 4,
        topic: "Test2"
      }
    ] as Topics[]).subscribe(res => {
      if (res) {
        this.bsTopicMap.next(this.flatToNested(res))
      }
    })
  }

  flatToNested(topics: Topics[]): TopicMap[] {
    const root: TopicMap[] = []
    const ref: { id: number, node: TopicMap }[] = []

    topics.forEach(i => {
      const temp: TopicMap = {
        id: i.id,
        name: i.topic,
        childs: [],
        parent: null
      }

      if (i.parentId) {
        const parent = ref.find(f => f.id == i.parentId)
        if (parent) {
          parent.node.childs.push(temp)
          temp.parent = parent.node
        }
      }
      else
        root.push(temp)

      ref.push({ id: i.id, node: temp })
    })

    return root
  }

  selectTopic(topic: TopicMap) {
    this.bsSelectedTopic.next(topic)
  }

}