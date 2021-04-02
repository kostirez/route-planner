import {Injectable} from '@angular/core';
import {Bike} from '../../model/bike';
import {MapItems} from './map-items';
import {Car} from '../../model/car';
import VectorLayer from 'ol/layer/Vector';
import {OlFuncService} from '../ol-func.service';
import {HttpService} from '../httpService/http.service';
import {ItemTypeEnum} from '../../model/item-type.enum';


@Injectable({
  providedIn: 'root'
})
export class MapItemService {

  private bikeItems: MapItems<Bike>;

  private carItems: MapItems<Car>;

  private streetItems: MapItems<any>;

  constructor(private olFuncService: OlFuncService,
              private httpService: HttpService) {
    this.bikeItems = new MapItems<Bike>(olFuncService, httpService);
    this.carItems = new MapItems<Car>(olFuncService, httpService);
    this.streetItems = new MapItems<any>(olFuncService, httpService);
  }

  getBikeLayer(): VectorLayer {
    return this.bikeItems.getLayer();
  }

  getCarLayer(): VectorLayer {
    return this.carItems.getLayer();
  }


  loadCars(): void {
    this.carItems.loadItems(ItemTypeEnum.CAR);
  }

  addCars(): void {
    this.carItems.addAll();
  }

  loadBikes(): void {
    this.bikeItems.loadItems(ItemTypeEnum.BIKE);
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



  addStreet(): void {
    this.streetItems.addAll();
  }

  hideStreet(): void {
    this.streetItems.removeAll();
  }

  loadStreet(): void {
    this.bikeItems.loadItems(ItemTypeEnum.STREET);
  }

  getStreetLayer(): VectorLayer {
    return this.streetItems.getLayer();
  }
}
