import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, of, Subject} from 'rxjs';
import {GeoJson} from '../../view/model/geoJson';
import {ICircleFilter, IMyApiFilter} from '../../interfaces/ICircleFilter';

@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  headers = new HttpHeaders()
    .set('content-type', 'application/json; charset=utf-8');

  url = 'http://localhost:3000/';

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

  getRoute(): Observable<any> {
    const myObservable = of(
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                14.470367431640623,
                50.07862503227565
              ],
              [
                14.49697494506836,
                50.07862503227565
              ],
              [
                14.495086669921875,
                50.06705670574863
              ],
              [
                14.465045928955076,
                50.06077558832056
              ],
              [
                14.441184997558592,
                50.06562424259453
              ],
              [
                14.443073272705078,
                50.07708274998269
              ],
              [
                14.443759918212892,
                50.084573370675564
              ]
            ]
          }
        }
      ]
    });
    return myObservable;
  }


}
