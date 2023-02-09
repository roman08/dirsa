import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  baseUrl: string = environment.api;
  constructor(private http: HttpClient, private _srvStorage: StorageService) {}

  getGroups(): Observable<any> {
     const URL = this.baseUrl + 'get-groups';
     const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));


     const headers = new HttpHeaders()
       .set('Accept', 'application/json')
       .set('Authorization', token);

     return this.http
       .get(URL, { headers: headers,})
       .pipe(map((res) => res));
  }
  createGroup(nombre: string, estatus: string, agents: any[]): Observable<any> {
    const URL = this.baseUrl + 'create-group';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const body = {
      nombre: nombre,
      estatus: estatus,
      agents: agents,
    };

    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }
}
