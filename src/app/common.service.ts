import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, Subject, catchError } from 'rxjs';
import { apiHost } from 'src/api';
import { TopicMap, Topics } from './shared';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private static token?: string | null

  constructor(private http: HttpClient, private router: Router) { }

  public setToken = (value: string) => { CommonService.token = value }
  public getToken = () => CommonService.token

  public logged = () => CommonService.token ? true : false

  public callApi<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: object): Observable<T> {
    path = apiHost + path

    const headers = {}
    let json!: string
    if (body) {
      Object.defineProperty(headers, "Content-Type", {
        value: "application/json",
        writable: true,
        enumerable: true,
        configurable: true
      })
      json = JSON.stringify(body)
    }

    if (CommonService.token) {
      Object.defineProperty(headers, "Authorization", {
        value: `Bearer ${CommonService.token}`,
        writable: true,
        enumerable: true,
        configurable: true
      })
    }

    const observable = this.http.request<T>(method, path, {
      body: json,
      headers: headers
    })

    return observable.pipe(
      catchError(err => {
        if (err.status && err.status == 401 && this.router.url !== "/admin") {
          this.router.navigateByUrl("/admin")
          return EMPTY
        }
        throw err
      })
    )
  }
}



@Injectable({
  providedIn: 'root'
})
export class TopicMapService {

  private subject = new Subject<TopicMap[]>()

  constructor(private service: CommonService) { }

  register = this.subject.pipe()

  init() {
    this.service.callApi<Topics[]>("/debug", "POST", [
      {
        id: 1,
        topic: "Home"
      },
      {
        id: 2,
        topic: "Test1",
        subtopic: [
          {
            id: 3,
            topic: "Test1-1"
          },
          {
            id: 5,
            topic: "Test1-2",
            subtopic: [
              {
                id: 6,
                topic: "Test1-2-1"
              }
            ]
          }
        ]
      },
      {
        id: 4,
        topic: "Test2"
      }
    ] as Topics[]).subscribe(res => {
      if (res) {
        const ref = [] as TopicMap[]
        this.handleMap(res, ref)
        this.subject.next(ref)
      }
    })
  }

  /**
   * Convert **raw data** object to {@link TopicMap} object.
   * @param topic 
   * @param parent 
   * @description recursively process
   */
  private handleMap(topic: Topics[], parent: TopicMap[]) {
    if (topic) {
      for (let i = 0; i < topic.length; i++) {
        const index = topic[i]

        const temp: TopicMap = {
          id: index.id,
          name: index.topic,
          childs: [],
          parent: parent
        }

        if (index.subtopic && index.subtopic.length > 0)
          this.handleMap(index.subtopic, temp.childs)

        parent.push(temp)
      }
    }
  }

}