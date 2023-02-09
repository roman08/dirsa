import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.api;
  constructor(private http: HttpClient, private _srvStorage: StorageService) {}

  login(usuario: string, password: string): Observable<any> {
    const URL = this.baseUrl + 'login';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const body = {
      usuario: usuario,
      password: password,
    };

    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }

  logout(): Observable<any> {
    const URL = this.baseUrl + 'logout';
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  sendEmail(email: string): Observable<any> {
    const URL = this.baseUrl + 'send-mail';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const body = {
      email: email,
    };

    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }
}
