import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campania } from 'src/app/models/campania.model';
import { CampaniasService } from 'src/app/services/campanias.service';

@Component({
  selector: 'app-campania-list',
  templateUrl: './campania-list.component.html',
  styleUrls: ['./campania-list.component.css'],
})
export class CampaniaListComponent implements OnInit {
  campanias: Campania[] = [];
  constructor(
    private router: Router,
    private _srvCampanias: CampaniasService
  ) {}

  ngOnInit(): void {
    this._srvCampanias.getCampanias().subscribe((res) => {
      this.campanias = res.data;
      
      console.log(this.campanias);
    });
  }

  createCampania() {
    this.router.navigateByUrl('/dashboard/crear-campania');
  }
}
