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


  createCampania(data: { nombre: any; fecha_creacion: any; bilingue: any; id_forma_de_pago: any; id_supervisor: any; id_grupo: any; }): Observable<any> {
    const URL = this.baseUrl + 'campania/create';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

  

    return this.http.post(URL, data, { headers }).pipe(map((res) => res));
  }


  addMonthCampania(data: { id_campania: string | null; anio: any; id_mes: any; dias_habiles: any; numero_agentes: any; hrs_jornada: any; precio_hr: any; tipo_moneda: any; total_horas: any; total_costo: any; monto_fijo_mensual: any; }): Observable<any> {
    const URL = this.baseUrl + 'campania/addMonth';
    // const token = 'Bearer ' + this.storageSrv.get('token');

    const headers = new HttpHeaders().set('Accept', 'application/json');

    return this.http.post(URL, data, { headers }).pipe(map((res) => res));
  }
}
