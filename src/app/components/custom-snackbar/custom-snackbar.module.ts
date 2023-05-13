import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSnackbarComponent } from './custom-snackbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [CustomSnackbarComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarouselModule,
    LazyLoadImageModule,
    MatIconModule,
    FormsModule,
  ],
  providers: [MatDialog],
  exports: [CustomSnackbarComponent],
  bootstrap: [CustomSnackbarComponent]
})
export class CustomSnackbarModule {}
