import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniaDetail } from 'src/app/models/campaniaDetail.model';
import { CampaniasService } from 'src/app/services/campanias.service';

@Component({
  selector: 'app-campania-list-detail',
  templateUrl: './campania-list-detail.component.html',
  styleUrls: ['./campania-list-detail.component.css'],
})
export class CampaniaListDetailComponent implements OnInit {
  id_campania;
  details: CampaniaDetail[] = [];
  num_agents: number = 0;
  horas_meta: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService,
    private router: Router
  ) {
    this.id_campania = this.route.snapshot.paramMap.get('id');
    this.getCampaniaDetail(this.id_campania);
  }

  ngOnInit(): void {}

  getCampaniaDetail(id: string | null) {
    this._srvCampania.getCampaniaDetail(id).subscribe((res) => {
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
