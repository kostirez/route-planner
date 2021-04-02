import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {GeoJson, Geometry} from '../../model/geoJson';
import {ItemTypeEnum} from '../../model/item-type.enum';
import {Params} from '../../model/params';
import {ulice} from '../../../../assets/ulice';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  headers = new HttpHeaders()
    .set('content-type', 'application/json; charset=utf-8')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnRpbi5rb3N0b2hyeXpAZ21haWwuY29tIiwiaWQiOjU2NiwibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWF0IjoxNjExMTM0OTQ3LCJleHAiOjExNjExMTM0OTQ3LCJpc3MiOiJnb2xlbWlvIiwianRpIjoiNDA1MTkzYWMtMjIwYS00ZGRjLTkxYmMtMDBjODQ3NzZlNzg2In0.bYg3gopShLJDOHBOAAU96F7IcXJWHBSZbhgD-UgJfeQ');

  golemioUrl = 'https://api.golemio.cz/v2/';

  constructor(private http: HttpClient) {
  }

  getMapItems(itemType: ItemTypeEnum, params: Params = {}): Observable<GeoJson<any>> {
    if (itemType === ItemTypeEnum.STREET) {
      return this.getStreets();
    }
    const httpParams = new HttpParams();
    for (const [key, value] of Object.entries(params)) {
      httpParams.append(key, value);
    }
    return this.http
      .get<GeoJson<any>>(this.golemioUrl + itemType.valueOf() + '/',
        {headers: this.headers});
  }

  // getRoute(start,end): Observable<any> {
  //   return this.http.get<GeoJson<any>[]>(this)
  // }

  getStreets(): any {
    const geo = new GeoJson<any>();
    ulice.forEach(ul => {
      const cor: Geometry = {type: 'LineString', coordinates: []};
      ul.geometry.coordinates.forEach(c => {
        cor.coordinates.push([c[0], c[1]]);
      });
      geo.features.push({geometry: cor, properties: ul.properties, type: ul.type});
    });
    const a =  of(geo);
    return a;
  }

}
