import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Month } from 'src/app/models/month.model';
import { CampaniasService } from 'src/app/services/campanias.service';

@Component({
  selector: 'app-campania-list-months',
  templateUrl: './campania-list-months.component.html',
  styleUrls: ['./campania-list-months.component.css'],
})
export class CampaniaListMonthsComponent implements OnInit {
  id_campania;

  months: Month[] = [];
  constructor(
    private _srvCampania: CampaniasService,
    private route: ActivatedRoute,
  ) {
    this.id_campania = this.route.snapshot.paramMap.get('id');

    this._srvCampania.getMonthsCampania(this.id_campania).subscribe((res) => {
      console.log(res);
      this.months = res.data;
      
    });
  }

  ngOnInit(): void {}
}
