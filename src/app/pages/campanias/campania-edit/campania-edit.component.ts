import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, Leader, TypePay } from 'src/app/models/campania.model';
import { Origin } from 'src/app/models/origin.model';
import { CampaniasService } from 'src/app/services/campanias.service';
import { GeneralService } from 'src/app/services/general.service';
import { GroupService } from 'src/app/services/group.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-campania-edit',
  templateUrl: './campania-edit.component.html',
  styleUrls: ['./campania-edit.component.css'],
})
export class CampaniaEditComponent implements OnInit {
  id_campania: any;

  campaniaForm: FormGroup;
  idTypeAgent: number = 0;
  typePays: TypePay[] = [];
  leaders: Leader[] = [];
  groups: Group[] = [];
  origins: Origin[] = [];
  typeCampania: any;

  typeModel: number = 0;
  liderModel: number = 0;
  grupoModel: number = 0;
  nameModel: string = '';
  fInicioModel: string = '';
  originData: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _srvCampania: CampaniasService,
    private _srvGeneral: GeneralService,
    private formBuilder: FormBuilder,
    private _srvGroup: GroupService,
    private router: Router
  ) {
    this.campaniaForm = this.formBuilder.group({
      nombre: new FormControl(''),
      fechaInicio: new FormControl(''),
      pay: new FormControl(''),
      group: new FormControl(''),
      leader: new FormControl(''),
      type: new FormControl(''),
      origin: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.id_campania = this.route.snapshot.paramMap.get('id');
    this._srvGeneral.getTypePays().subscribe((res) => {
      this.typePays = res.data;
    });

    this._srvGroup.getGroups().subscribe((res) => {
      this.groups = res.data;
    });

    this._srvGeneral.getLeaders().subscribe((res) => {
      this.leaders = res.data;
    });

    this._srvGeneral.getOrigins().subscribe((res) => {
      this.origins = res.data;
    });
    this.getCampania(this.id_campania);
  }

  getCampania(id: number) {
    this._srvCampania.geyById(id).subscribe((res) => {
      if (res.status == 'success') {
        const data = res.data;
        console.log(data);
        

        this.liderModel = data.leaders[0].id;
        this.grupoModel = data.groups[0].id;
        this.typeModel = data.id_forma_de_pago;
        this.nameModel = data.nombre;
        this.fInicioModel = data.fecha_creacion;
        this.typeCampania = data.bilingue;
        this.originData = data.id_type_origin;
      }
    });
  }

  create() {
    const nombre = this.campaniaForm.value['nombre'];
    const fecha_creacion = this.campaniaForm.value['fechaInicio'];
    const id_forma_de_pago = this.campaniaForm.value['pay'];
    const id_grupo = this.campaniaForm.value['group'];
    const id_supervisor = this.campaniaForm.value['leader'];
    const bilingue = this.campaniaForm.value['type'];
    const originData = this.campaniaForm.value['origin'];
    
    const body = {
      nombre: nombre,
      fecha_creacion: fecha_creacion,
      bilingue: bilingue,
      id_forma_de_pago: id_forma_de_pago,
      id_supervisor: id_supervisor,
      id_grupo: id_grupo,
      id: this.id_campania,
      id_type_origin: originData
    };

    this._srvCampania.update(body).subscribe((res) => {
      if (res.status == 'success') {
        swal.fire('Do It Right', res.message, 'success');
        this.router.navigateByUrl('/dashboard/listado-campanias');
        // /dashboard/adilost - camapnias;
      }
    });
  }
}
