import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export enum HttpMethod {'GET', 'POST', 'PUT', 'DELETE'}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private token: String | null = null

  constructor(private http: HttpClient) { }

  public callApi<T>(path: string, method: HttpMethod, body: any = null): Observable<T> {
    path = apiHost + path
    let headers = {}

    if (body) {
        Object.defineProperty(headers, "Content-Type", {
            value: "application/json",
            writable: true,
            enumerable: true,
            configurable: true
        })
        body = JSON.stringify(body)
    }

    if (this.token) {
        Object.defineProperty(headers, "Authorization", {
            value: `Bearer ${this.token}`,
            writable: true,
            enumerable: true,
            configurable: true
        })
    }

    switch (method) {
      case HttpMethod.GET:
        return this.http.get<T>(path, headers)
      case HttpMethod.POST: 
        return this.http.post<T>(path, body, headers)
      case HttpMethod.PUT:
        return this.http.put<T>(path, body, headers)
      case HttpMethod.DELETE:
        return this.http.delete<T>(path, headers)
    }
  }
}

export const apiHost = "https://hohuuduc.onrender.com/"