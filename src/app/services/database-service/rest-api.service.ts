import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {GeoJson} from '../../model/geoJson';
import {ICircleFilter, IMyApiFilter} from '../../model/interfaces/ICircleFilter';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  headers = new HttpHeaders()
    .set('Access-Control-Allow-Origin', '*')
    .set('content-type', 'application/json; charset=utf-8');
  // .set('Access-Control-Allow-Headers', 'Access-Control-Allow-Origin, Content-Type, Accept, Accept-Language, Origin, User-Agent');



  url = 'http://193.86.103.229:3000/';
  // url = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
  }

  getItems(filter: IMyApiFilter, type: string): Observable<GeoJson<any>> {
    let paramss = new HttpParams();
    Object.keys(filter).forEach((item) => {
      paramss = paramss.set(item, filter[item]);
    });
    return this.http.get<GeoJson<any>>(this.url + type, {
      params: paramss,
      headers: this.headers,
    });
  }

  getRoute(from: [number, number], to: [number, number], transportType: string): Observable<any> {
    let paramss = new HttpParams();
    paramss = paramss.set('from', from[0] + ',' + from[1]);
    paramss = paramss.set('to', to[0] + ',' + to[1]);
    paramss = paramss.set('transportType', transportType);
    // console.log('getRoute', transportType);
    return this.http.get<GeoJson<any>>(this.url + 'Graph', {
      params: paramss,
      headers: this.headers,
    });
  }


}
