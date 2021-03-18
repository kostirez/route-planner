import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {bikeUrl, carUrl, parkingLotUrl} from '../const/url-const';
import {GeoJson} from '../model/geoJson';
import {Bike} from '../model/bike';
import {Car} from '../model/car';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  baseMap: number;

  headers = new HttpHeaders()
    .set('content-type', 'application/json; charset=utf-8')
    .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnRpbi5rb3N0b2hyeXpAZ21haWwuY29tIiwiaWQiOjU2NiwibmFtZSI6bnVsbCwic3VybmFtZSI6bnVsbCwiaWF0IjoxNjExMTM0OTQ3LCJleHAiOjExNjExMTM0OTQ3LCJpc3MiOiJnb2xlbWlvIiwianRpIjoiNDA1MTkzYWMtMjIwYS00ZGRjLTkxYmMtMDBjODQ3NzZlNzg2In0.bYg3gopShLJDOHBOAAU96F7IcXJWHBSZbhgD-UgJfeQ');

  constructor(private http: HttpClient) {
  }

  setMap(mapNum: number): void {
    this.baseMap = mapNum;
  }



  getBikes(): Observable<GeoJson<Bike>[]> {
    return this.http.get<GeoJson<Bike>[]>(bikeUrl, { headers: this.headers });
  }

  getCars(): Observable<GeoJson<Car>[]> {
    return this.http.get<GeoJson<Car>[]>(carUrl, { headers: this.headers });
  }

  // getParkingLot(): Observable<ParkingLot> {
  //   return this.http.get<Car[]>(parkingLotUrl);
  // }
}
