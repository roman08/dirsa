import { Component, OnInit } from '@angular/core';
import { Agent } from 'src/app/models/agent.model';
import { User } from 'src/app/models/users.model';
import { AgentsService } from 'src/app/services/agents.service';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css'],
})
export class AgentsListComponent implements OnInit {
  agents: User[] = [];
  p: number = 1;
  total: number = 0;
  loading: boolean = false;
  bandera: boolean = true;
  constructor(private _srvAgents: AgentsService) {}

  ngOnInit(): void {
    this.getAgents();
  }

  getAgents() {
    this._srvAgents.getAllAgents().subscribe((res) => {
      const data = res['data'];
      this.agents = [];
      // this.agents = data['data'];


      for(let a of data['data']){
        console.log(a.campanias.length);
        
        const nombre_campania = (a.campanias.length > 0) ? a.campanias[0].nombre : '';

        
        let agent = new User();
        agent.email = a.email;
        agent.nombre_completo = a.nombre_completo;
        agent.id = a.id;
        agent.numero_empleado = a.numero_empleado;
        agent.campania = nombre_campania;

        this.agents.push(agent);
        
      }

      console.log(this.agents);
      
      this.total = data['total'];
      this.p = data['current_page'];
    });
  }

  pageChange(newPage: number) {
    this.loading = true;
    this._srvAgents.getAgentesPaginate(newPage).subscribe((res) => {
      const data = res['data'];
      this.agents = [];
      this.agents = data['data'];
      this.total = data['total'];
      this.p = data['current_page'];
      this.loading = false;
    });
    // this.router.navigate([''], { queryParams: { page: newPage } });
  }
}
