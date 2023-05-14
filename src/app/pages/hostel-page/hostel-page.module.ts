import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/material.module';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { HostelPageComponent } from './hostel-page.component';
import { CarouselModule } from 'ngx-owl-carousel-o';

const route: Routes = [{
  path: '',
  component: HostelPageComponent
}]

@NgModule({
  declarations: [
    HostelPageComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    LazyLoadImageModule,
    LeafletModule,
    CarouselModule,
    RouterModule.forChild(route),
  ],
  providers: [AuthService],
  bootstrap: [HostelPageComponent]
})
export class HostelPageModule { }
