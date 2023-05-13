import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarouselModule,
    LazyLoadImageModule,
    FormsModule,
  ],
  providers: [MatDialog],
  exports: [ConfirmationModalComponent],
  bootstrap: [ConfirmationModalComponent]
})
export class ConfirmationModalModule {}
