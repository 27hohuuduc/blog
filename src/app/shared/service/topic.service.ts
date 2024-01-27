import { Injectable } from '@angular/core';
import { ApiService, TopicMap } from '..';
import { BehaviorSubject } from 'rxjs';

type Topics = {
  id: number
  topic: string,
  index: number,
  parentId: number
}

const topicTnit: TopicMap = {
  id: 0,
  name: "",
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
        id: 4,
        topic: "Test2",
        index: 1
      },
      {
        id: 2,
        topic: "Test1",
        index: 0
      },
      {
        id: 5,
        topic: "Test1-2",
        index: 1,
        parentId: 2
      },
      {
        id: 3,
        topic: "Test1-1",
        index: 0,
        parentId: 2
      },
      {
        id: 6,
        topic: "Test1-2-3",
        index: 2,
        parentId: 5
      },
      {
        id: 7,
        topic: "Test1-2-1",
        index: 0,
        parentId: 5
      },
      {
        id: 8,
        topic: "Test1-2-2",
        index: 1,
        parentId: 5
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
          parent.node.childs.splice(i.index, 0, temp)
          temp.parent = parent.node
        }
      }
      else
        root.splice(i.index, 0, temp)

      ref.push({ id: i.id, node: temp })
    })

    return root
  }

  selectTopic(topic: TopicMap) {
    this.bsSelectedTopic.next(topic)
  }

}