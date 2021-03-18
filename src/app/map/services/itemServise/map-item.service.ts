import {Injectable} from '@angular/core';
import {Bike} from '../../model/bike';
import {MapItems} from './map-items';
import {Car} from '../../model/car';
import VectorLayer from 'ol/layer/Vector';
import {OlFuncService} from '../ol-func.service';
import {HttpService} from '../httpService/http.service';
import {ItemType} from '../../model/item-type';


@Injectable({
  providedIn: 'root'
})
export class MapItemService {

  private bikeItems: MapItems<Bike>;

  private carItems: MapItems<Car>;

  constructor(private olFuncService: OlFuncService,
              private httpService: HttpService) {
    this.bikeItems = new MapItems<Bike>(olFuncService, httpService);
    this.carItems = new MapItems<Car>(olFuncService, httpService);
  }

  getBikeLayer(): VectorLayer {
    return this.bikeItems.getLayer();
  }

  getCarLayer(): VectorLayer {
    return this.carItems.getLayer();
  }


  loadCars(): void {
    this.carItems.loadItems(ItemType.CAR);
  }

  addCars(): void {
    this.carItems.addAll();
  }

  loadBikes(): void {
    this.bikeItems.loadItems(ItemType.BIKE);
  }

  addBikes(): void {
    this.bikeItems.addAll();
  }

  hideBikes(): void {
    this.bikeItems.removeAll();
  }

  hideCars(): void {
    this.carItems.removeAll();
  }

}
