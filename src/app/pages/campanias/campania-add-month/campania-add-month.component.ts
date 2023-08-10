import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniasService } from 'src/app/services/campanias.service';
import swal from 'sweetalert2';
import { Location } from '@angular/common';


@Component({
  selector: 'app-campania-add-month',
  templateUrl: './campania-add-month.component.html',
  styleUrls: ['./campania-add-month.component.css'],
})
export class CampaniaAddMonthComponent implements OnInit {
  monthForm: FormGroup;
  fullHours: number = 0;
  fullDays: number = 0;
  agents: number = 0;
  hours: number = 0;
  priceHours: number = 0;
  fullTotal: number = 0;
  id_campania;

  mounths: any[] = [];
  total_months: number = 0;
  month!: number;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService,
    private _location: Location
  ) {
    this.id_campania = this.route.snapshot.paramMap.get('id');
    this.getDetail(this.id_campania);

    let yearNow = new Date().getFullYear();
    this.monthForm = this.formBuilder.group({
      year: new FormControl(yearNow),
      month: new FormControl('', [Validators.required]),
      days: new FormControl('', [Validators.required]),
      agents: new FormControl('', [Validators.required]),
      hours: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      currency: new FormControl('', [Validators.required]),
      totalHours: new FormControl('', [Validators.required]),
      fullCost: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  getDetail(id_campania: any) {
    this._srvCampania.geyById(id_campania).subscribe((res) => {
      if (res.status == 'success') {
        const data = res.data;

        this.mounths = data.months;
      }
    });
  }
  create() {
    const year = this.monthForm.value['year'];
    const month = this.monthForm.value['month'];
    const days = this.monthForm.value['days'];
    const agents = this.monthForm.value['agents'];
    const hours = this.monthForm.value['hours'];
    const price = this.monthForm.value['price'];
    const currency = this.monthForm.value['currency'];
    const totalHours = this.monthForm.value['totalHours'];
    const fullCost = this.monthForm.value['fullCost'];

    const body = {
      id_campania: this.id_campania,
      anio: year,
      id_mes: month,
      dias_habiles: days,
      numero_agentes: agents,
      hrs_jornada: hours,
      precio_hr: price,
      tipo_moneda: currency,
      total_horas: totalHours,
      total_costo: fullCost,
      monto_fijo_mensual: fullCost,
    };

    this._srvCampania.addMonthCampania(body).subscribe((res) => {
      if (res.status == 'success') {
        swal.fire('Do It Right', res.message, 'success');
        this.router.navigateByUrl('/dashboard/listado-campanias');
      }
    });
  }

  calculeFullHours() {
    this.fullHours = this.fullDays * this.agents * this.hours;
  }
  calculeFullTotal() {
    this.fullTotal = this.fullHours * this.priceHours;
  }

  selecMounth(e: any) {
    this.total_months = this.mounths.filter((x) => x.id_mes == e.value).length;
    if (this.total_months > 0) {
      this.monthForm.controls['month'].reset();
      swal.fire(
        'DIRSA',
        'Este mes ya tiene asignda una configuración.',
        'error'
      );
    }
  }

  backClicked() {
    this._location.back();
  }
}
