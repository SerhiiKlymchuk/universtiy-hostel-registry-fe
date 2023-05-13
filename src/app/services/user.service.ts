import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Filters } from '../interfaces/filters.interface';
import { University } from '../interfaces/university.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private api: ApiService
  ) { }

  public findAllUsers(body: Filters): Observable<any> {
    let url = `/users?limit=${body.limit}&skip=${body.skip}`;

    if(body.filter){
      url += `&filter=${body.filter}`;
    }

    return this.api.get(url, { });
  }

  public findById(id: string): Observable<User> {
    return this.api.get('/users/' + id, {});
  }

  public create(body: any): Observable<any> {
    return this.api.post('/users', { body });
  }

  public update(id: string, body: any): Observable<any> {
    return this.api.put('/users/' + id, { body });
  }

  public delete(id: string): Observable<any> {
    return this.api.delete('/users/' + id, { });
  }
}
