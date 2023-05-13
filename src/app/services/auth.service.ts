import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { ROLES } from '../enums/roles.enum';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  public login(body: FormData): Observable<any> {
    return this.api.post('/auth/login', { body }).pipe(
      map((res) => {
        if(res.access_token) {
          this.setToken(res.access_token);
          this.setRole(res.role);
        }

        return res;
      })
    );
  }

  public logout(): void{
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');

    location.href = '/'
    this.snackbarService.openSnack(true, 'Successfully logged out!')
  }

  private setToken(token: string): void{
    sessionStorage.setItem('token', token);
  }

  private setRole(role: ROLES): void{
    sessionStorage.setItem('role', role);
  }

  public isAdmin(): boolean{
    return sessionStorage.getItem('role') == ROLES.ADMIN;
  }

  public isAuthorized(): boolean{
    return !!sessionStorage.getItem('token');
  }
}
