import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UniversitiesListComponent } from './universities-list.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatDialogModule } from '@angular/material/dialog';

const route: Routes = [{
  path: '',
  component: UniversitiesListComponent
}]

@NgModule({
  declarations: [
    UniversitiesListComponent,
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
  bootstrap: [UniversitiesListComponent]
})
export class UniversitiesListModule { }
