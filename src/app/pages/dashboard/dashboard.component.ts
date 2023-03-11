import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { HoursAdmin } from 'src/app/models/hoursAdmin.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';
import { Month } from '../../models/campania.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  hours: HoursAdmin = new HoursAdmin();
  month: Month = new Month();
  mounth!: number;
  totalAgentsDanger: number = 0;
  agentsDanger: any[] = [];
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      // horas metas configuracion mes
      {
        data: [0, 35, 5],
        label: 'Horas meta',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      // horas metas horas agente mes
      {
        data: [0, 28, 6],
        label: 'Horas reales',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: [
      '1 enero',
      '2 febrero',
      '3 marzo',
      '4 abril',
      '5 mayo',
      '6 junio',
      '7 julio',
    ],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  user_id: any;

  constructor(
    private _srvCampania: CampaniasService,
    private _srvStorage: StorageService
  ) {}

  ngOnInit(): void {
    this.user_id = JSON.parse(this._srvStorage.get('user_id'));
    const mountActuality = this.getMouthActuality();
    this.getHours(mountActuality, this.user_id);
  }

  getHours(month: number, idUser: number) {
    this._srvCampania.getHoursSupervisor(month, idUser).subscribe((res) => {
      this.hours = new HoursAdmin();
      this.hours = res.data[0];
      this.getMonth(month, this.hours.id_campania);
    });
  }

  getMonth(month: number, id_campania: number | undefined) {
    this._srvCampania.getMonthCampania(month, id_campania).subscribe((res) => {
      this.month = new Month();
      this.month = res.data[0];
    });
  }

  getAgentsDanger() {
    const firstDay = this.getFirtsDayMounthActuality();
    const lastDay = this.getLastDayMounthActuality();
    this._srvCampania
      .getAgentsDanger(firstDay, lastDay, this.hours.id_campania)
      .subscribe((res) => {
        const agents = res.data;

        for (let agent of agents) {
          if (agent.total_days >= 3) {
            this.agentsDanger.push(agent);
            this.totalAgentsDanger++;
          }
        }
      });
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
  private static generateNumber(i: number): number {
    return Math.floor(Math.random() * (i < 2 ? 100 : 1000) + 1);
  }

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: {}[];
  }): void {}

  searhcHours() {
    this.getHours(this.mounth, this.user_id);
  }

  getMouthActuality() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    this.mounth = mesActual;
    return mesActual;
  }
}
