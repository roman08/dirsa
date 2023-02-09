import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampaniasService } from 'src/app/services/campanias.service';
import swal from 'sweetalert2';

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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService
  ) {
    this.id_campania = this.route.snapshot.paramMap.get('id');
 
    
    let yearNow = new Date().getFullYear();
    this.monthForm = this.formBuilder.group({
      year: new FormControl(yearNow),
      month: new FormControl(''),
      days: new FormControl(''),
      agents: new FormControl(''),
      hours: new FormControl(''),
      price: new FormControl(''),
      currency: new FormControl(''),
      totalHours: new FormControl(''),
      fullCost: new FormControl(''),
    });
  }

  ngOnInit(): void {}

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

      this._srvCampania.addMonthCampania(body).subscribe( res => {
        if (res.status == 'success') {
          swal.fire('Alerta', res.message, 'success');
          this.router.navigateByUrl('/dashboard/listado-campanias');
          // /dashboard/adilost - camapnias;
        }
      })

      console.log(body);
      
  }

  calculeFullHours() {
    this.fullHours = this.fullDays * this.agents * this.hours;
  }
  calculeFullTotal() {
    this.fullTotal = this.fullHours * this.priceHours;
  }
}
