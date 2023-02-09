import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AccesoGuard implements CanActivate {
  constructor(private router: Router, private _srvStorage: StorageService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    const token = JSON.parse(this._srvStorage.get('token'));
    const userRole = this._srvStorage.get('role');

    if (token === null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
