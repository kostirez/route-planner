import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapStateService {

  private mapZoom: Subject<number>;

  private coords: Subject<[number, number]>;

  constructor() {
    this.mapZoom = new Subject<number>();
    this.coords = new Subject<[number, number]>();
  }

  changeZoom(zoom: number): void {
    this.mapZoom.next(zoom);
  }

  getZoom(): Observable<number> {
    return this.mapZoom;
  }

  changeCoords(coords: [number, number]): void {
    this.coords.next(coords);
  }

  getCoords(): Observable<[number, number]> {
    return this.coords;
  }
}
