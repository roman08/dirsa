import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AgentDay } from 'src/app/models/agentDay.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-show-list-agents-day',
  templateUrl: './show-list-agents-day.component.html',
  styleUrls: ['./show-list-agents-day.component.css'],
})
export class ShowListAgentsDayComponent implements OnInit {
  day: any;
  id_campania: string | null;
  agents: AgentDay[] = [];
  horas_meta_dia: number = 0;


  constructor(
    private _srvStorage: StorageService,
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService
  ) {
    this.day = JSON.parse(this._srvStorage.get('day'));
    this.id_campania = this.route.snapshot.paramMap.get('id');

    const mes = this.getMouthActuality(this.day);
    this._srvCampania
      .getAgentsDay(this.id_campania, this.day, mes)
      .subscribe((res) => {
        this.agents = res.data;
        this.horas_meta_dia = res.configuracion.hrs_jornada;
      });
  }

  ngOnInit(): void {}

  getMouthActuality(fecha: string) {

    const date = new Date(fecha);
    const mesActual = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    const mes = mesActual.getMonth().toString().padStart(2, '0');
    return parseInt(mes);
  }
}
