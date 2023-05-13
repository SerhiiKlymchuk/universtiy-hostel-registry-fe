import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';
import { Filters } from '../interfaces/filters.interface';
import { Hostel } from '../interfaces/hostel.interface';

@Injectable({
  providedIn: 'root'
})
export class HostelService {

  constructor(
    private api: ApiService
  ) { }

  public findAllHostels(body: Filters): Observable<any> {
    let url = `/hostels?limit=${body.limit}&skip=${body.skip}`;

    if(body.filter){
      url += `&filter=${body.filter}`;
    }

    return this.api.get(url, { });
  }

  public findById(id: string): Observable<Hostel> {
    return this.api.get('/hostels/' + id, {});
  }

  public create(body: any): Observable<any> {
    return this.api.post('/hostels', { body });
  }

  public update(id: string, body: any): Observable<any> {
    return this.api.put('/hostels/' + id, { body });
  }

  public delete(id: string): Observable<any> {
    return this.api.delete('/hostels/' + id, { });
  }
}
