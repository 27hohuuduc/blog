import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private static token?: string | null

  constructor(private http: HttpClient, private router: Router) { }

  public setToken = (value: string) => { ApiService.token = value }
  public getToken = () => ApiService.token

  public logged = () => ApiService.token ? true : false

  public callApi<T>(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: object): Observable<T> {
    path = environment.apiHost + path

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

    if (ApiService.token) {
      Object.defineProperty(headers, "Authorization", {
        value: `Bearer ${ApiService.token}`,
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