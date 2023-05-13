import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Filters } from '../interfaces/filters.interface';
import { University } from '../interfaces/university.interface';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {

  constructor(
    private api: ApiService
  ) { }

  public findAllUniversities(body: Filters): Observable<any> {
    let url = `/universities?limit=${body.limit}&skip=${body.skip}`;

    if(body.filter){
      url += `&filter=${body.filter}`;
    }

    return this.api.get(url, { });
  }

  public findById(id: string): Observable<University> {
    return this.api.get('/universities/' + id, {});
  }

  public create(body: any): Observable<any> {
    return this.api.post('/universities', { body });
  }

  public update(id: string, body: any): Observable<any> {
    return this.api.put('/universities/' + id, { body });
  }

  public delete(id: string): Observable<any> {
    return this.api.delete('/universities/' + id, { });
  }
}
