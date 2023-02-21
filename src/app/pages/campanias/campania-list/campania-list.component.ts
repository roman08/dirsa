import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Campania } from 'src/app/models/campania.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import swal from 'sweetalert2';

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
    this.getAllCampanias();
  }

  getAllCampanias(){
    this.campanias = [];
    this._srvCampanias.getCampanias().subscribe((res) => {
      this.campanias = res.data;

    });
  }
  createCampania() {
    this.router.navigateByUrl('/dashboard/crear-campania');
  }

  delete( id: number){
    this._srvCampanias.delete(id).subscribe(res => {
      if(res.status === 'success'){
        swal.fire('DIRSA', res.message, 'success');
        this.getAllCampanias();
      }else {
        swal.fire('DIRSA', res.message, 'error');
      }
    });
  }
}
