import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { apiHost } from 'src/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private static token?: string | null

  constructor(private http: HttpClient, private router: Router) { }

  public setToken = (value: string) => { CommonService.token = value }
  public getToken = () => CommonService.token

  public logged = () => CommonService.token ? true : false

  public callApi<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body: object | string = ""): Observable<T> {
    path = apiHost + path

    const headers = {}

    if (body) {
      Object.defineProperty(headers, "Content-Type", {
        value: "application/json",
        writable: true,
        enumerable: true,
        configurable: true
      })
      body = JSON.stringify(body)
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
      body: body,
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