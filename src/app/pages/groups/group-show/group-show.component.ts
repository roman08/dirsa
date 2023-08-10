import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Agent } from 'src/app/models/agent.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-show',
  templateUrl: './group-show.component.html',
  styleUrls: ['./group-show.component.css'],
})
export class GroupShowComponent implements OnInit {
  id_grupo: any;
  agentsGroup: Agent[] = [];
  
  constructor(private route: ActivatedRoute, private _srvGroup: GroupService) {
    this.id_grupo = this.route.snapshot.paramMap.get('id');
    this.getGroup(this.id_grupo);
  }

  ngOnInit(): void {}

  getGroup(id: number) {
    this._srvGroup.get(id).subscribe((res) => {
      const agentsGroup = res.data.agentes;

      
      for (let a of agentsGroup) {
        let agent = new Agent();
        agent.id = a.id;
        agent.numero_empleado = a.numero_empleado;
        agent.nombre_completo = a.nombre_completo;
        this.agentsGroup.push(agent);
      }
    });
  }
}
