import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campania } from 'src/app/models/campania.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-campania-supervisor',
  templateUrl: './list-campania-supervisor.component.html',
  styleUrls: ['./list-campania-supervisor.component.css'],
})
export class ListCampaniaSupervisorComponent implements OnInit {
  campanias: Campania[] = [];
  user_name: string;

  constructor(
    private _srvCampania: CampaniasService,
    public _srvStorage: StorageService,
    private router: Router,
    
  ) {
    this.user_name = JSON.parse(this._srvStorage.get('user_name'));
  }

  ngOnInit(): void {
    this._srvCampania.getAgentCampanias().subscribe((res) => {
      if (res.status == 'success') {
        this.campanias = res['data'];
      }
    });
  }

  showDetail(id_campania: number, id_type_origin: number) {
    // /dashboard/aaacimnp - detail;

    this._srvStorage.set('id_type_origin', id_type_origin);
    this.router.navigate(['/dashboard/campania-detail', id_campania]);
  }

  
}
