import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GeoJson} from '../../model/geoJson';
import {ItemType} from '../../model/item-type';
import {Params} from '../../model/params';

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

  getMapItems(itemType: ItemType, params: Params = {}): Observable<GeoJson<any>> {
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


}
