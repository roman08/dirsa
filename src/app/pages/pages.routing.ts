import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

import { AccesoGuard } from '../guards/acceso.guard';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { GroupCreateComponent } from './groups/group-create/group-create.component';
import { CampaniaListComponent } from './campanias/campania-list/campania-list.component';
import { CampaniaCreateComponent } from './campanias/campania-create/campania-create.component';
import { CampaniaAddMonthComponent } from './campanias/campania-add-month/campania-add-month.component';



const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'ProgressBar' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: 'Graficas' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'acount-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Temas' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'listado-grupos',
        component: GroupListComponent,
        data: { titulo: 'Listado de grupos' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'crear-grupo',
        component: GroupCreateComponent,
        data: { titulo: 'Crear grupo' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'listado-campanias',
        component: CampaniaListComponent,
        data: { titulo: 'Listado de campa??as' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'crear-campania',
        component: CampaniaCreateComponent,
        data: { titulo: 'Crear campa??a' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'add-month-campania/:id',
        component: CampaniaAddMonthComponent,
        data: { titulo: 'Agregar mes' },
        canActivate: [AccesoGuard],
      },
      //   { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ],
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
