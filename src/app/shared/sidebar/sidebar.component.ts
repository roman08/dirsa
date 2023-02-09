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

  constructor(
    private sidebarService: SidebarService,
    private _srvStorage: StorageService,
    private router: Router,
    private _srvAuth: AuthService
  ) {
    this.role = JSON.parse(this._srvStorage.get('role'));
    this.menuItems = sidebarService.menu;
    console.log('hola');
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
