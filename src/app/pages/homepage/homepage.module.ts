import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

const route: Routes = [{
  path: '',
  component: HomepageComponent
}]

@NgModule({
  declarations: [
    HomepageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    LazyLoadImageModule,
    LeafletModule,
    RouterModule.forChild(route),
  ],
  providers: [AuthService],
  bootstrap: [HomepageComponent]
})
export class HomepageModule { }
