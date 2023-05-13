import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { HostelPageComponent } from './pages/hostel-page/hostel-page.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitleComponent } from './components/title/title.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { HostelEditCreateModule } from './components/hostel-edit-create/hostel-edit-create.module';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationModalModule } from './components/confirmation-modal/confirmation-modal.module';
import { CustomSnackbarModule } from './components/custom-snackbar/custom-snackbar.module';
import { UniversityEditCreateModule } from './components/university-edit-create/university-edit-create.module';
import { UserEditCreateModule } from './components/user-edit-create/user-edit-create.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    AdminLayoutComponent,
    HostelPageComponent,
    HeaderComponent,
    FooterComponent,
    TitleComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    HostelEditCreateModule,
    UniversityEditCreateModule,
    UserEditCreateModule,
    LeafletModule,
    ConfirmationModalModule,
    MatDialogModule,
    CustomSnackbarModule
  ],
  providers: [
    MatDialog,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}, // Add any data you wish to test if it is passed/used correctly
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
