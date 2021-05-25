import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeoJson} from '../../model/geoJson';
import {IGolemioFilter} from '../../model/interfaces/IGolemioFilter';
import {Car} from '../../model/car';
import {Bike} from '../../model/bike';
import {ICircleFilter} from '../../model/interfaces/ICircleFilter';

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

  getItems(filter: IGolemioFilter, type: string): Observable<GeoJson<any>> {
    let paramss = new HttpParams();
    Object.keys(filter).forEach((item) => {
      paramss = paramss.set(item, filter[item]);
    });
    // console.log('golemio, params', paramss);
    // console.log('golemio, header', this.headers);
    // console.log('golemio, type', type);
    // console.log('golemio, filter', filter);
    return this.http.get<GeoJson<any>>(this.golemioUrl + type, {
      params: paramss,
      headers: this.headers,
    });
  }

  getCars(filtr: IGolemioFilter): Observable<GeoJson<Car>> {
    return this.getItems(filtr, 'sharedcars');
  }

  getBikes(filtr: IGolemioFilter): Observable<GeoJson<Bike>> {
    return this.getItems(filtr, 'sharedbikes');
  }

  geoFilterToIfiltr(geoFilter: ICircleFilter): IGolemioFilter{
    return {
      latlng: geoFilter.coordinates[0] + ',' + geoFilter.coordinates[0],
      range: geoFilter.radius
    };
  }
}
