import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class CampaniasService {
  baseUrl: string = environment.api;
  constructor(private http: HttpClient, private _srvStorage: StorageService) {}

  getCampanias(): Observable<any> {
    const URL = this.baseUrl + 'campanias';
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getCampaniasAdmin(mounth: number): Observable<any> {
    const URL = this.baseUrl + `campanias/getHoursAdmin?mounth=${mounth}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getAgentsDanger(
    firstDay: string,
    lastDay: string | Date,
    id_campania: string | number | null | undefined
  ): Observable<any> {
    // const URL = this.baseUrl + 'campanias/getCampaaniasAdmin';
    const URL =
      this.baseUrl +
      `campanias/getAgentsDanger?firstDay=${firstDay}&lastDay=${lastDay}&id_campania=1`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }
  createCampania(data: {
    nombre: any;
    fecha_creacion: any;
    bilingue: any;
    id_forma_de_pago: any;
    id_supervisor: any;
    id_grupo: any;
  }): Observable<any> {
    const URL = this.baseUrl + 'campania/create';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post(URL, data, { headers }).pipe(map((res) => res));
  }

  addMonthCampania(data: {
    id_campania: string | null;
    anio: any;
    id_mes: any;
    dias_habiles: any;
    numero_agentes: any;
    hrs_jornada: any;
    precio_hr: any;
    tipo_moneda: any;
    total_horas: any;
    total_costo: any;
    monto_fijo_mensual: any;
  }): Observable<any> {
    const URL = this.baseUrl + 'campania/addMonth';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post(URL, data, { headers }).pipe(map((res) => res));
  }

  getAgentCampanias(): Observable<any> {
    const user_id = this._srvStorage.get('user_id');
    const URL = this.baseUrl + `leader/campanias?id=${user_id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  delete(id: number): Observable<any> {
    const URL = this.baseUrl + `campanias/delete?id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  geyById(id: number): Observable<any> {
    const URL = this.baseUrl + `campanias/getById?id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  update(data: {
    nombre: any;
    fecha_creacion: any;
    bilingue: any;
    id_forma_de_pago: any;
    id_supervisor: any;
    id_grupo: any;
    id: any;
  }): Observable<any> {
    const URL = this.baseUrl + 'campania/update';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post(URL, data, { headers }).pipe(map((res) => res));
  }

  getCampaniaDetail(
    id_usuario_registro: string | null,
    id_type_origin: any,
    id_campania: string | null,
    firstDay: string,
    lastDay: string,
    mountActuality: number
  ): Observable<any> {
    const URL =
      this.baseUrl +
      `campanias/getCampaniaAgent?id_usuario_registro=${id_usuario_registro}&id_type_origin=${id_type_origin}&id_campania=${id_campania}&firstDay=${firstDay}&lastDay=${lastDay}&mountActuality=${mountActuality}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getMonthsCampania(id: string | null): Observable<any> {
    const URL = this.baseUrl + `campanias/getMonthsCampania?id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getHoursSupervisor(mounth: number, id: number, idCampania: number): Observable<any> {
    const URL =
      this.baseUrl + `campanias/getHoursSupervisor?mounth=${mounth}&id=${id}&idCampania=${idCampania}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getMonthCampania(mounth: number, id: number | undefined): Observable<any> {
    const URL =
      this.baseUrl + `campanias/getMonthCampania?month=${mounth}&id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getDataGrafica(id: number | undefined): Observable<any> {
    const URL = this.baseUrl + `campanias/getDataGrafica?id=${id}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }

  getAgentsDay(id: string | null, day: any, mes: number): Observable<any> {
    const URL = this.baseUrl + `campanias/getAgentsMonth?id=${id}&day_register=${day}&mes=${mes}`;
    const token = 'Bearer ' + JSON.parse(this._srvStorage.get('token'));

    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Authorization', token);

    return this.http.get(URL, { headers: headers }).pipe(map((res) => res));
  }
}
