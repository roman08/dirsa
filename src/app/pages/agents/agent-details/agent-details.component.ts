import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/users.model';
import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css'],
})
export class AgentDetailsComponent implements OnInit {
  agente: User = new User();
  id_agent: any;
  constructor(private route: ActivatedRoute, private _srvAgent: AgentsService) {
    this.id_agent = this.route.snapshot.paramMap.get('id');

    this._srvAgent.getById(this.id_agent).subscribe((res) => {
      const data = res['data'];
      const agent = new User();


      const nombre_campania =
        data.campanias.length > 0 ? data.campanias[0].nombre : '';

      agent.id = data.id;
      agent.nombre_completo = data.nombre_completo;
      agent.email = data.email;
      agent.numero_empleado = data.numero_empleado;
      agent.curp = data.curp;
      agent.campania = nombre_campania;

      this.agente = agent;
      // this.agent = res.data;
      // for( let a of res['data']){
      //   console.log(a);

      // }
      console.log(this.agente);
    });
    

    
  }

  ngOnInit(): void {}
}
