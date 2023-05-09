import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit {
  menuItems: any[] | undefined;
  role: string;

  nameUser: string = '';
  imgProfile: string = '';
  email: string = '';

  total = 0;
  constructor(
    private sidebarService: SidebarService,
    private _srvStorage: StorageService,
    private router: Router,
    private _srvAuth: AuthService
  ) {
    this.role = JSON.parse(this._srvStorage.get('role'));
    this.total = (this.role == 'Administrador') ? 4 : 2;
    this.menuItems = sidebarService.menu;
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
      this.router.navigateByUrl('/');
    });
  }

  validateRole(data: any[]) {
    const result = data.filter((obj) => {
      return obj.name === this.role;
    });

    const valid = result.length > 0 ? true : false;
    return valid;
  }
}
