import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RepotesProcapsComponent } from './repotes-procaps/repotes-procaps.component';
import { AppModule } from '../app.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import {ExcelService} from './repotes-procaps/services/excel.service';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AlertFechainimayorComponent } from './alert/alert-fechainimayor/alert-fechainimayor.component';
import { AlertNoregistrosComponent } from './alert/alert-noregistros/alert-noregistros.component';
import { AlertErrorComponent } from './alert/alert-error/alert-error.component';


@NgModule({
  declarations: [
    DashboardComponent,
    RepotesProcapsComponent,
    AlertFechainimayorComponent,
    AlertNoregistrosComponent,
    AlertErrorComponent
  ],
  imports: [
    CommonModule,
    ModulesRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatDatepickerModule,
    MatInputModule,
    // MatNativeDateModule
    MatMomentDateModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    
  ]
})
export class ModulesModule { }
