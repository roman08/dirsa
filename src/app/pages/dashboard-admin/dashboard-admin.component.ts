import { Component, OnInit } from '@angular/core';
import { HoursAdmin } from 'src/app/models/hoursAdmin.model';
import { CampaniasService } from 'src/app/services/campanias.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
})
export class DashboardAdminComponent implements OnInit {
  campanias: HoursAdmin[] = [];
  mounth!: number;
  constructor(private _srvCampanias: CampaniasService) {}

  ngOnInit(): void {
    const mountActuality = this.getMouthActuality();
    this.getHours(mountActuality);
  }

  getHours(mounth: number) {
    this._srvCampanias.getCampaniasAdmin(mounth).subscribe((res) => {
      this.campanias = [];
      this.campanias = res.data;

    });
  }

  searhcHours(){
    this.getHours(this.mounth);
  }
  getMouthActuality() {
    const fechaActual = new Date();
    const mesActual = fechaActual.getMonth() + 1; // devuelve un número entre 0 y 11

    // const nombreMesActual = fechaActual.toLocaleString('default', {
    //   month: 'long',
    // });
    this.mounth = mesActual;
    return mesActual;
  }
}
