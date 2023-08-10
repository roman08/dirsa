import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { NgChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { GroupListComponent } from './groups/group-list/group-list.component';
import { CreateGroupComponent } from './groups/group-list/complements/create-group/create-group.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { GroupCreateComponent } from './groups/group-create/group-create.component';
import { CampaniaListComponent } from './campanias/campania-list/campania-list.component';
import { CampaniaCreateComponent } from './campanias/campania-create/campania-create.component';
import { CampaniaAddMonthComponent } from './campanias/campania-add-month/campania-add-month.component';
import { AgentsListComponent } from './agents/agents-list/agents-list.component';
import { LoadFileComponent } from './agents/load-file/load-file.component';
import { ListCampaniaSupervisorComponent } from './supervisor/list-campania-supervisor/list-campania-supervisor.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { BillinguePipe } from '../pipes/billingue.pipe';
import { CampaniaEditComponent } from './campanias/campania-edit/campania-edit.component';
import { GroupEditComponent } from './groups/group-edit/group-edit.component';
import { GroupShowComponent } from './groups/group-show/group-show.component';
import { CampaniaListDetailComponent } from './supervisor/campania-list-detail/campania-list-detail.component';
import { AgentDetailsComponent } from './agents/agent-details/agent-details.component';
import { CampaniaListMonthsComponent } from './campanias/campania-list-months/campania-list-months.component';
import { ShowListAgentsDayComponent } from './supervisor/show-list-agents-day/show-list-agents-day.component';
import { ShowListAgentsDangerComponent } from './supervisor/show-list-agents-danger/show-list-agents-danger.component';
import { MesPipe } from '../pipes/mes.pipe';
import { AuthModule } from '../auth/auth.module';
import { CoinsPipe } from '../pipes/coins.pipe';

const materialModules = [
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
];



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    GroupListComponent,
    CreateGroupComponent,
    GroupCreateComponent,
    CampaniaListComponent,
    CampaniaCreateComponent,
    CampaniaAddMonthComponent,
    AgentsListComponent,
    LoadFileComponent,
    ListCampaniaSupervisorComponent,
    DashboardAdminComponent,
    BillinguePipe,
    CampaniaEditComponent,
    GroupEditComponent,
    GroupShowComponent,
    CampaniaListDetailComponent,
    AgentDetailsComponent,
    CampaniaListMonthsComponent,
    ShowListAgentsDayComponent,
    ShowListAgentsDangerComponent,
    MesPipe,
    CoinsPipe,
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    materialModules,
    BillinguePipe,
    MesPipe,
    CoinsPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    materialModules,
    ReactiveFormsModule,
    FileUploadModule,
    NgChartsModule,
    NgxPaginationModule,
    AuthModule,
  ],
  entryComponents: [CreateGroupComponent],
})
export class PagesModule {}
