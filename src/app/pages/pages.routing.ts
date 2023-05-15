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
import { AgentsListComponent } from './agents/agents-list/agents-list.component';
import { LoadFileComponent } from './agents/load-file/load-file.component';
import { ListCampaniaSupervisorComponent } from './supervisor/list-campania-supervisor/list-campania-supervisor.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { CampaniaEditComponent } from './campanias/campania-edit/campania-edit.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupShowComponent } from './groups/group-show/group-show.component';
import { CampaniaListDetailComponent } from './supervisor/campania-list-detail/campania-list-detail.component';
import { AgentDetailsComponent } from './agents/agent-details/agent-details.component';
import { CampaniaListMonthsComponent } from './campanias/campania-list-months/campania-list-months.component';
import { ShowListAgentsDayComponent } from './supervisor/show-list-agents-day/show-list-agents-day.component';
import { ShowListAgentsDangerComponent } from './supervisor/show-list-agents-danger/show-list-agents-danger.component';
import { ProfileComponent } from '../auth/profile/profile.component';



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
        data: { titulo: 'Listado de campañas' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'crear-campania',
        component: CampaniaCreateComponent,
        data: { titulo: 'Crear campaña' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'add-month-campania/:id',
        component: CampaniaAddMonthComponent,
        data: { titulo: 'Agregar mes' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'agents',
        component: AgentsListComponent,
        data: { titulo: 'Agentes' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'load-file',
        component: LoadFileComponent,
        data: { titulo: 'Carga de archivo' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'list-campanias-supervisor',
        component: ListCampaniaSupervisorComponent,
        data: { titulo: 'Mi campaña' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'dashboard-admin',
        component: DashboardAdminComponent,
        data: { titulo: 'Dashboard Administrador' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'campania-edit/:id',
        component: CampaniaEditComponent,
        data: { titulo: 'Editar campaña' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'group-edit/:id',
        component: GroupEditComponent,
        data: { titulo: 'Editar grupo' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'group-show/:id',
        component: GroupShowComponent,
        data: { titulo: 'Detalle grupo' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'campania-detail/:id',
        component: CampaniaListDetailComponent,
        data: { titulo: 'Detalle campaña' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'agente-detail/:id',
        component: AgentDetailsComponent,
        data: { titulo: 'Agentes / detalle agente' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'list-months/:id',
        component: CampaniaListMonthsComponent,
        data: { titulo: 'Campaña / listado meses' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'list-agents/:id',
        component: ShowListAgentsDayComponent,
        data: { titulo: 'Agentes / listado día' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'list-agents-danger',
        component: ShowListAgentsDangerComponent,
        data: { titulo: 'Agentes / en riesgo' },
        canActivate: [AccesoGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        data: { titulo: 'Mi perfil' },
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
