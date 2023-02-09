import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/group.mode';
import { Leader } from 'src/app/models/leader.model';
import { TypePay } from 'src/app/models/typePay.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { GeneralService } from 'src/app/services/general.service';
import { GroupService } from 'src/app/services/group.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-campania-create',
  templateUrl: './campania-create.component.html',
  styleUrls: ['./campania-create.component.css'],
})
export class CampaniaCreateComponent implements OnInit {
  campaniaForm: FormGroup;
  idTypeAgent: number = 0;
  typePays: TypePay[] = [];
  leaders: Leader[] = [];
  groups: Group[] = [];
  favoriteSeason: string | undefined;
  seasons: string[] = ['Winter', 'Spring'];
  typeCampania: any;
  constructor(
    private _srvGeneral: GeneralService,
    private formBuilder: FormBuilder,
    private _srvGroup: GroupService,
    private router: Router,
    private _srvCampanias: CampaniasService
  ) {
    this.campaniaForm = this.formBuilder.group({
      nombre: new FormControl(''),
      fechaInicio: new FormControl(''),
      pay: new FormControl(''),
      group: new FormControl(''),
      leader: new FormControl(''),
      type: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this._srvGeneral.getTypePays().subscribe((res) => {
      this.typePays = res.data;
    });

    this._srvGroup.getGroups().subscribe((res) => {
      this.groups = res.data;
    });

    this._srvGeneral.getLeaders().subscribe((res) => {
      this.leaders = res.data;
      console.log(this.leaders);
    });
  }

  create() {
    const nombre = this.campaniaForm.value['nombre'];
    const fecha_creacion = this.campaniaForm.value['fechaInicio'];
    const id_forma_de_pago = this.campaniaForm.value['pay'];
    const id_grupo = this.campaniaForm.value['group'];
    const id_supervisor = this.campaniaForm.value['leader'];
    const bilingue = this.campaniaForm.value['type'];

    const body = {
      nombre: nombre,
      fecha_creacion: fecha_creacion,
      bilingue: bilingue,
      id_forma_de_pago: id_forma_de_pago,
      id_supervisor: id_supervisor,
      id_grupo: id_grupo,
    };


    this._srvCampanias.createCampania( body ).subscribe( res => {
      console.log(res);
      if (res.status == 'success') {
        swal.fire('Alerta', res.message, 'success');
        this.router.navigateByUrl('/dashboard/listado-campanias');
        // /dashboard/adilost - camapnias;
      }
      
    });
  }
}
