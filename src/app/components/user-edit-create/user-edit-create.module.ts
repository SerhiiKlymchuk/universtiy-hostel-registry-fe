import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditCreateComponent } from './user-edit-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModule } from 'src/app/shared/material.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BlobToImagePipe } from 'src/app/pipes/blob-to-image.pipe';

@NgModule({
  declarations: [UserEditCreateComponent],
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
  exports: [UserEditCreateComponent],
  bootstrap: [UserEditCreateComponent]
})
export class UserEditCreateModule {}
