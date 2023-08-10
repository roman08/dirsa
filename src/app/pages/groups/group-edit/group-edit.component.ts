import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { GeneralService } from 'src/app/services/general.service';
import { GroupService } from 'src/app/services/group.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.css'],
})
export class GroupEditComponent implements OnInit {
  agents: Agent[] = [];
  agentsGroup: Agent[] = [];
  selectedItemsList: any[] = [];
  groupForm: FormGroup;
  idTypeAgent: number = 0;

  id_grupo: any;

  nombreModel: string = '';

  constructor(
    private _srvGeneral: GeneralService,
    private formBuilder: FormBuilder,
    private _srvGroup: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.id_grupo = this.route.snapshot.paramMap.get('id');

    this.groupForm = this.formBuilder.group({
      nombre: new FormControl(''),
      idTypeAgent: new FormControl(''),
    });

    this.getGroup(this.id_grupo);
  }

  ngOnInit(): void {}

  getGroup(id: number) {
    this._srvGroup.get(id).subscribe((res) => {
      this.nombreModel = res.data.nombre;
      this.idTypeAgent = res.data.id_tipo_agente;
      
      const agentsGroup = res.data.agentes;
      

      
      
       for (let a of agentsGroup) {

         let agent = new Agent();
         agent.id = a.id;
         agent.nombre_completo = a.nombre_completo;
         this.agentsGroup.push(agent);
       }
      
      this.getAgents();
    });
  }
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
      .update(nombre, 'Activo', agents, idTypeAgent, this.id_grupo)
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

        const filteredProducts = this.agentsGroup.filter((filtered) =>
          filtered.nombre_completo.includes(a.nombre_completo)
        );
         agent.isChecked = filteredProducts.length > 0 ? true : false;
        // agent.isChecked = false;
        agent.nombre_completo = a.nombre_completo;
        agent.numero_empleado = a.numero_empleado;
        this.agents.push(agent);


      }

      console.log(this.agents);
      
    });
  }
}
