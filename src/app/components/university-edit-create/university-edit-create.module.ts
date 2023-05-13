import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniversityEditCreateComponent } from './university-edit-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BlobToImagePipe } from 'src/app/pipes/blob-to-image.pipe';

@NgModule({
  declarations: [UniversityEditCreateComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    CarouselModule,
    LazyLoadImageModule,
    FormsModule,
    BlobToImagePipe
  ],
  providers: [MatDialog],
  exports: [UniversityEditCreateComponent],
  bootstrap: [UniversityEditCreateComponent]
})
export class UniversityEditCreateModule {}
