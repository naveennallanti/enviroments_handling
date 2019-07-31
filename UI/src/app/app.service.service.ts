import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { Http, Headers } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {


  constructor(private http: HttpClient) { }

  getHeaders() {
    let headers = new Headers;
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  getEnv(process): Observable<any> {
    console.log("service entered")
    let getEnv_url = "http://localhost:3000/getEnvironment/" + process;
    return this.http.get(getEnv_url).pipe((map((res) => {
      return res
    })))


    // return this.http.get(getEnv_url)
  }
  addOrUpdate(process, key, value): Observable<any> {
    let getEnv_url = "http://localhost:3000/setEnvironment/" + process + "/" + key + "/" + value;
    return this.http.get(getEnv_url).pipe((map((res) => {
      return res
    })));
  }

}
