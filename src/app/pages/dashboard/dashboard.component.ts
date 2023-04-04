import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CCPM } from 'src/app/models/ccpm.model';
import { DataGrafica } from 'src/app/models/dataGrafica.model';
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
  data: any[] = [];
  ccpms: CCPM[] = [];
  hrsSystem: string | undefined;
  mountActuality: number = 0;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  user_id: any;
  id_campania: number = 0;

  // TODO : DATOS GRAFICA
  // lineChart
  lineChartType: ChartType = 'line';
  lineChartData: Array<any> = [];

  lineChartLabels: Array<any> = [];

  lineChartLegend: boolean = true;

  public lineChartOptions: any = {
    responsive: true,
  };

  constructor(
    private _srvCampania: CampaniasService,
    private _srvStorage: StorageService
  ) {}

  ngOnInit(): void {
    this.user_id = JSON.parse(this._srvStorage.get('user_id'));
    this.mountActuality = this.getMouthActuality();
    this._srvCampania.getAgentCampanias().subscribe((res) => {
      console.log(res);

      if (res.status == 'success' && res.data.length > 0) {
        this.id_campania = res.data[0].id;
        this.getHours(this.mountActuality, this.user_id, this.id_campania);

        // this.campanias = res['data'];
      }
    });
  }

  getHours(month: number, idUser: number, idCampania: number) {
    this.lineChartData = [];

    this._srvCampania
      .getHoursSupervisor(month, idUser, idCampania)
      .subscribe((res) => {
        if (res.data.length > 0) {
          this.hours = new HoursAdmin();
          this.hours = res.data[0];

          console.log(this.hours);

          this.getMonth(month, this.hours.id);
          this.getDataGrafica(this.hours.id);
          this.getAgentsDanger();
        }
      });
  }

  getMonth(month: number, id_campania: number | undefined) {
    this._srvCampania.getMonthCampania(month, id_campania).subscribe((res) => {
      this.month = new Month();
      this.month = res.data[0];

      console.log(this.month.numero_agentes);
    });
  }

  getDataGrafica(id: number | undefined) {
    this._srvCampania.getDataGrafica(id).subscribe((res) => {
      this.data = res.data.hora_grafica;
      this.ccpms = res.ccpm;

      const hrsSystem = Number(this.data[this.mounth]);

      this.hrsSystem = hrsSystem.toFixed(2); 
      console.log(this.hrsSystem);
      
      let horasTotal = [];
      let horasSistema = [];
      let meses = [];

      for (const key in this.data) {
        if (this.data.hasOwnProperty(key)) {
          const mes = this.ccpms.filter((x) => x.id_mes == Number(key))[0];
          horasTotal.push(mes.total_horas);
          horasSistema.push(this.data[key]);
          const nMes = Number(key);
          meses.push(this.obtenerNombreMes(nMes));
        }
      }

      this.lineChartLabels = meses;

      this.lineChartData = [
        { data: horasTotal, label: 'Horas meta' },
        { data: horasSistema, label: 'Horas sistema' },
      ];
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
    this.getHours(this.mounth, this.user_id, this.id_campania);
  }

  getMouthActuality() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1;

    this.mounth = mesActual;
    return mesActual;
  }

  obtenerNombreMes(numeroMes: number) {
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const fecha = new Date();
    fecha.setMonth(numeroMes - 1); // establece el mes en base al número, restando 1 para ajustar el índice
    return meses[fecha.getMonth()];
  }
}
