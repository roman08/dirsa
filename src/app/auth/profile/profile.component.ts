import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  dataUser: any;
  constructor(private _srvStorage: StorageService) {}

  ngOnInit(): void {
    this.dataUser = JSON.parse(this._srvStorage.get('user_data'));
    console.log(this.dataUser);
    
  }
}
