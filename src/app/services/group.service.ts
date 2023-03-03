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

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getGroupFilter(): Observable<any> {
    const URL = this.baseUrl + 'getGroupFilter';
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }
  createGroup(
    nombre: string,
    estatus: string,
    agents: any[],
    idTypeAgent: number
  ): Observable<any> {
    const URL = this.baseUrl + 'create-group';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const body = {
      nombre: nombre,
      estatus: estatus,
      agents: agents,
      id_tipo_agente: idTypeAgent,
    };

    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }

  delete(id: number): Observable<any> {
    const URL = this.baseUrl + `grupo/delete?id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  get(id: number): Observable<any> {
    const URL = this.baseUrl + `grupo/getById?id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  update(
    nombre: string,
    estatus: string,
    agents: any[],
    idTypeAgent: number,
    id: number
  ): Observable<any> {
    const URL = this.baseUrl + 'grupo/update';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    const body = {
      nombre: nombre,
      estatus: estatus,
      agents: agents,
      id_tipo_agente: idTypeAgent,
      id: id,
    };

    return this.http.post(URL, body, { headers }).pipe(map((res) => res));
  }
}
