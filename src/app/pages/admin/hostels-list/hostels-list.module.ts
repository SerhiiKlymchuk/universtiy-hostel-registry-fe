import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HostelsListComponent } from './hostels-list.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

const route: Routes = [{
  path: '',
  component: HostelsListComponent
}]

@NgModule({
  declarations: [
    HostelsListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    LazyLoadImageModule,
    MatDialogModule,
    RouterModule.forChild(route),
  ],
  providers: [AuthService],
  bootstrap: [HostelsListComponent]
})
export class HostelsListModule { }
