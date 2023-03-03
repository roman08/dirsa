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
  constructor(private _srvCampanias: CampaniasService) {}

  ngOnInit(): void {
    this._srvCampanias.getCampaniasAdmin().subscribe((res) => {
      this.campanias = res.data;

      console.log(this.campanias);
    });
  }
}
