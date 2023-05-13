import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  protected baseURL: string = environment.apiURL;

  private headers: any = {};

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  private getRequest(data: any): any {
    const token = sessionStorage.getItem('token');

    if(token) {
      this.headers['Authorization'] = `Bearer ${token}`
    }

    const headers = new HttpHeaders({
      ...(this.headers),
      ...(data ? data.headers : {}),
    });

    return {
      params: data ? data.params : {},
      headers,
    };
  }

  public get(url: string, data: any): Observable<any> {
    return new Observable((observer) => {

      const sub = this.http.get(
        this.baseURL + url,
        this.getRequest(data)
      ).subscribe((r) => {
        observer.next(r);
        observer.complete();
      }, (e) => {
        observer.error(e);
        observer.complete();
      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public post(url: string, data: any): Observable<any> {
    return new Observable((observer) => {

      const sub = this.http.post(
        this.baseURL + url,
        data.body ? data.body : {},
        this.getRequest(data)
      ).subscribe((r) => {
        observer.next(r);
        observer.complete();
      }, (e) => {
        observer.error(e);
        observer.complete();
        this.errorHandler(e);
      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public put(url: string, data: any): Observable<any> {
    return new Observable((observer) => {

      const sub = this.http.put(
        this.baseURL + url,
        data.body ? data.body : {},
        this.getRequest(data)
      ).subscribe((r) => {
        observer.next(r);
        observer.complete();
      }, (e) => {
        observer.error(e);
        observer.complete();
        this.errorHandler(e);
      });
      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public delete(url: string, data: any): Observable<any> {
    return new Observable((observer) => {

      const sub = this.http.delete(
        this.baseURL + url,
        this.getRequest(data)
      ).subscribe((r) => {
        observer.next(r);
        observer.complete();
      }, (e) => {
        observer.error(e);
        observer.complete();
        this.errorHandler(e);
      });

      return {
        unsubscribe() {
          sub.unsubscribe();
        }
      };
    });
  }

  public errorHandler(e: HttpErrorResponse) {
    this.snackbarService.openSnack(false, e.error.message);

    if(e && e.status == 401) {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }
}
