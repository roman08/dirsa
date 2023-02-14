import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agents-list',
  templateUrl: './agents-list.component.html',
  styleUrls: ['./agents-list.component.css'],
})
export class AgentsListComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  loadFile() {
    this.router.navigateByUrl('/dashboard/load-file');
  }
}
