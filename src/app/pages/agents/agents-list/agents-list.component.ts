import { Component, OnInit } from '@angular/core';
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
      this.agents = data['data'];
      this.total = data['total'];
      this.p = data['current_page'];
      console.log(res);
    });
  }

  pageChange(newPage: number) {
    console.log(newPage);
    this.loading = true;
    this._srvAgents.getAgentesPaginate(newPage).subscribe((res) => {
      const data = res['data'];
      this.agents = [];
      this.agents = data['data'];
      this.total = data['total'];
      this.p = data['current_page'];
      this.loading = false;
      console.log(res);
    });
    // this.router.navigate([''], { queryParams: { page: newPage } });
  }
}
