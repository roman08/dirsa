import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-show-list-agents-danger',
  templateUrl: './show-list-agents-danger.component.html',
  styleUrls: ['./show-list-agents-danger.component.css'],
})
export class ShowListAgentsDangerComponent implements OnInit {
  agents;
  dayDifference: number;
  p: number = 1;
  constructor(
    private _srvStorage: StorageService,
    private _location: Location
  ) {
    this.agents = JSON.parse(this._srvStorage.get('agentsDanger'));
    this.dayDifference = JSON.parse(this._srvStorage.get('dayDifference'));
  }

  ngOnInit(): void {}

  backClicked() {
    this._location.back();
  }
}
