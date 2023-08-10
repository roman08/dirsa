import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { GeneralService } from 'src/app/services/general.service';
import { GroupService } from 'src/app/services/group.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css'],
})
export class GroupCreateComponent implements OnInit {
  agents: Agent[] = [];
  selectedItemsList: any[] = [];
  groupForm: FormGroup;
  idTypeAgent: number = 0;

  constructor(
    private _srvGeneral: GeneralService,
    private formBuilder: FormBuilder,
    private _srvGroup: GroupService,
    private router: Router
  ) {
    this.groupForm = this.formBuilder.group({
      nombre: new FormControl(''),
      idTypeAgent: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  changeSelection() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.agents.filter((value, index) => {
      return value.isChecked;
    });
  }

  create() {
    const nombre = this.groupForm.value['nombre'];
    const idTypeAgent = this.groupForm.value['idTypeAgent'];
    const agents: number[] = [];
    for (let a of this.selectedItemsList) {
      agents.push(a.id);
    }

    this._srvGroup
      .createGroup(nombre, 'Activo', agents, idTypeAgent)
      .subscribe((res) => {
        swal.fire('Do It Right', res.message, 'success');
        this.router.navigateByUrl('/dashboard/listado-grupos');
      });
  }

  getAgents() {
    this.agents = [];
    this._srvGeneral.getAgents(this.idTypeAgent).subscribe((res) => {
      for (let a of res['data']) {
        let agent = new Agent();
        agent.id = a.id;
        agent.isChecked = false;
        agent.nombre_completo = a.nombre_completo;
        agent.numero_empleado = a.numero_empleado;
        this.agents.push(agent);
        
      }
    });
  }
}
