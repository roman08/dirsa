import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaDetail } from 'src/app/models/campaniaDetail.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';

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

  constructor(
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService,
    private router: Router,
    private _srvStorage: StorageService
  ) {
    this.id_type_origin = JSON.parse(this._srvStorage.get('id_type_origin'));
    this.id_campania = this.route.snapshot.paramMap.get('id');
    this.id_user = JSON.parse(this._srvStorage.get('user_id'));
    this.getCampaniaDetail(this.id_user, this.id_type_origin, this.id_campania);
  }

  ngOnInit(): void {}

  getCampaniaDetail(id: string | null, id_type_origin: any, id_campania: string | null) {
    this._srvCampania
      .getCampaniaDetail(id, id_type_origin, id_campania)
      .subscribe((res) => {
        if (res.status == 'success') {
          this.details = [];
          this.details = res.data.data;

          const configuracion = res.data.respuesta;

          this.num_agents = configuracion.numero_agentes;
          const hrs_jornada = configuracion.hrs_jornada;
          this.horas_meta = this.num_agents * hrs_jornada;

          console.log();
        }
      });
  }

  loadFile() {
    this.router.navigateByUrl('/dashboard/load-file');
  }
}
