import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersListComponent } from './users-list.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatDialogModule } from '@angular/material/dialog';

const route: Routes = [{
  path: '',
  component: UsersListComponent
}]

@NgModule({
  declarations: [
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    LazyLoadImageModule,
    MatDialogModule,
    DatePipe,
    RouterModule.forChild(route),
  ],
  providers: [AuthService],
  bootstrap: [UsersListComponent]
})
export class UsersListModule { }
