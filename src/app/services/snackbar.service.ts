import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  public config: MatSnackBarConfig = {
    panelClass: 'style-success',
    duration: 4000,
    horizontalPosition: 'right',
    verticalPosition: 'bottom'
  };

  constructor(public snackBar: MatSnackBar) { }

  public openSnack(isSuccess: boolean = true, msg: string): void {
    if(!msg) {
      msg = isSuccess ? 'Changes successfully applied!' : 'An error occured ...';
    }
    
    this.config.panelClass = isSuccess ? 'snack-success' : 'snack-error';

    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: msg,
      ...this.config
    });
  }

}
