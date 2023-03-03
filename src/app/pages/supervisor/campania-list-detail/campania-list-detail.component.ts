import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaDetail } from 'src/app/models/campaniaDetail.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-campania-list-detail',
  templateUrl: './campania-list-detail.component.html',
  styleUrls: ['./campania-list-detail.component.css'],
})
export class CampaniaListDetailComponent implements OnInit {
  id_campania;
  id_type_origin: any;
  details: CampaniaDetail[] = [];
  num_agents: number = 0;
  horas_meta: number = 0;
  id_user: any;
  starDate: any;
  endDate: any;
  validDate: boolean = true;
  totalAgentsDanger!: number;
  constructor(
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService,
    private router: Router,
    private _srvStorage: StorageService
  ) {
    this.id_type_origin = JSON.parse(this._srvStorage.get('id_type_origin'));
    this.id_campania = this.route.snapshot.paramMap.get('id');
    this.id_user = JSON.parse(this._srvStorage.get('user_id'));
    this.getCampaniaDetail();
  }

  ngOnInit(): void {}

  getCampaniaDetail() {
    const firstDay = this.getFirtsDayMounthActuality();
    const lastDay = this.getLastDayMounthActuality();
    const fechaActual = new Date();
    const mountActuality = this.getMouthActuality(fechaActual);

    this._srvCampania
      .getAgentsDanger(firstDay, lastDay, this.id_campania)
      .subscribe((res) => {
        this.totalAgentsDanger = res.data.length;
        console.log(res.data.length);
      });
    
    this._srvCampania
      .getCampaniaDetail(
        this.id_user,
        this.id_type_origin,
        this.id_campania,
        firstDay,
        lastDay,
        mountActuality
      )
      .subscribe((res) => {
        if (res.status == 'success') {
          this.details = [];
          this.details = res.data.data;

          const configuracion = res.data.respuesta;

          this.num_agents = configuracion.numero_agentes;
          const hrs_jornada = configuracion.hrs_jornada;
          this.horas_meta = this.num_agents * hrs_jornada;
        } else {
          swal.fire('DIRSA', res.message, 'error');
        }
      });
  }

  loadFile() {
    this.router.navigateByUrl('/dashboard/load-file');
  }

  getFirtsDayMounthActuality() {
    const fechaActual = new Date();
    const primerDiaMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth(),
      1
    );

    const dia = primerDiaMes.getDate().toString().padStart(2, '0');
    const mes = (primerDiaMes.getMonth() + 1).toString().padStart(2, '0');
    const anio = primerDiaMes.getFullYear().toString();
    return `${anio}-${mes}-${dia}`;
  }

  getLastDayMounthActuality() {
    const fechaActual = new Date();

    const ultimoDiaMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0
    );

    const diaF = ultimoDiaMes.getDate().toString().padStart(2, '0');
    const mesF = (ultimoDiaMes.getMonth() + 1).toString().padStart(2, '0');
    const anioF = ultimoDiaMes.getFullYear().toString();
    return `${anioF}-${mesF}-${diaF}`;
  }

  getMouthActuality(date: Date) {
    console.log(date);

    const mesActual = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const mes = mesActual.getMonth().toString().padStart(2, '0');
    return parseInt(mes);
  }

  search() {
    const starDate = new Date(this.starDate);
    const mountActuality = this.getMouthActuality(starDate);

    this._srvCampania
      .getCampaniaDetail(
        this.id_user,
        this.id_type_origin,
        this.id_campania,
        this.starDate,
        this.endDate,
        mountActuality
      )
      .subscribe((res) => {
        if (res.status == 'success') {
          this.details = [];
          this.details = res.data.data;

          const configuracion = res.data.respuesta;

          this.num_agents = configuracion.numero_agentes;
          const hrs_jornada = configuracion.hrs_jornada;
          this.horas_meta = this.num_agents * hrs_jornada;
        } else {
          swal.fire('DIRSA', res.message, 'error');
        }
      });
  }

  selectStartDate() {
    this.validDate = false;
  }

  selectEndDate(){
    const starDate = new Date(this.starDate);
        const endDate = new Date(this.endDate);

    if( this.getMouthActuality(starDate)  == this.getMouthActuality(endDate)) {
      console.log('mismo mes');
      
    }else{
      console.log('meses diferentes');
      
    }

  }
}
