import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    AccountSettingsComponent,
    materialModules,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    materialModules,
    ReactiveFormsModule,
  ],
  entryComponents: [CreateGroupComponent],
})
export class PagesModule {}
