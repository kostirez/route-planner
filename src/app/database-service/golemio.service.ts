import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeoJson} from './../map/model/geoJson';
import {Ifiltr} from '../interfaces/Ifiltr';
import {Car} from '../map/model/car';
import {Bike} from '../map/model/bike';

@Injectable({
  providedIn: 'root'
})
export class GolemioService {

  headers = new HttpHeaders()
    .set('content-type', 'application/json; charset=utf-8')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnRpbi5rb3N0b2hyeXpAZ21haWwuY29tIiwiaWQiOjU2NiwibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWF0IjoxNjExMTM0OTQ3LCJleHAiOjExNjExMTM0OTQ3LCJpc3MiOiJnb2xlbWlvIiwianRpIjoiNDA1MTkzYWMtMjIwYS00ZGRjLTkxYmMtMDBjODQ3NzZlNzg2In0.bYg3gopShLJDOHBOAAU96F7IcXJWHBSZbhgD-UgJfeQ');

  golemioUrl = 'https://api.golemio.cz/v2/';

  constructor(private http: HttpClient) {
  }

  private getItems(filtr: Ifiltr, type: string): Observable<GeoJson<any>> {
    let paramss = new HttpParams();
    Object.keys(filtr).forEach((item) => {
      paramss = paramss.set(item, filtr[item]);
    });
    return this.http.get<GeoJson<any>>(this.golemioUrl + type, {
      params: paramss,
      headers: this.headers,
    });
  }

  getCars(filtr: Ifiltr): Observable<GeoJson<Car>> {
    return this.getItems(filtr, 'sharedcars');
  }

  getBikes(filtr: Ifiltr): Observable<GeoJson<Bike>> {
    return this.getItems(filtr, 'sharedbikes');
  }

}
