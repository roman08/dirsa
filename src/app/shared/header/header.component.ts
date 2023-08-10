import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [],
})
export class HeaderComponent implements OnInit {
  nameUser: string = '';
  imgProfile: string = '';
  email: string = '';
  constructor(
    private _srvStorage: StorageService,
    private router: Router,
    private _srvAuth: AuthService
  ) {
    this.nameUser = JSON.parse(this._srvStorage.get('user_name'));
    const imgProfile = this._srvStorage.get('img_profile');
    this.imgProfile = (imgProfile == "")
      ? JSON.parse(imgProfile)
      : 'https://www.fgjcdmx.gob.mx/themes/base/assets/images/def-user.png';
    this.email = JSON.parse(this._srvStorage.get('email'));
  }

  ngOnInit(): void {}

  logout() {
    this._srvAuth.logout().subscribe((respuesta) => {
      this._srvStorage.remove('token');
      this._srvStorage.remove('role');
       this._srvStorage.remove('user_name');
        this._srvStorage.remove('img_profile');
      this.router.navigateByUrl('/');
    });
  }
}
