import {Injectable} from '@angular/core';
import {Bike} from '../../model/bike';
import {Car} from '../../model/car';
import VectorLayer from 'ol/layer/Vector';
import {OlFuncService} from '../ol-func-service/ol-func.service';
import {ItemTypeEnum} from '../../model/item-type.enum';
// import {GeoFiltr} from '../../interfaces/IgeoFiltr';


@Injectable({
  providedIn: 'root'
})
export class  MapItemService {

  // private bikeItems: MapItems<Bike>;
  //
  // private carItems: MapItems<Car>;
  //
  // private streetItems: MapItems<any>;
  //
  // private itemLayers: MapItems<any>[];

  constructor(private olFuncService: OlFuncService) {
    // this.bikeItems = new MapItems<Bike>(olFuncService, httpService);
    // this.carItems = new MapItems<Car>(olFuncService, httpService);
    // this.streetItems = new MapItems<any>(olFuncService, httpService);
    this.initLayers();
  }

  initLayers(): void {
    // this.itemLayers = [];
    // this.addLayer(new MapItems<Bike>(this.olFuncService, this.httpService));
    // this.addLayer(new MapItems<Car>(this.olFuncService, this.httpService));
  }

  // addLayer(mapItem: MapItems<any>): void {
  //   // this.itemLayers.push(mapItem);
  // }

  // getItemLayer(type: string, filtr: GeoFiltr): VectorLayer {
  //    const index = this.itemLayers
  //     .findIndex((l) => l.getType() === type);
  //
  // }


//
//
//   loadCars(): void {
//     this.carItems.loadItems(ItemTypeEnum.CAR);
//   }
//
//   addCars(): void {
//     this.carItems.addAll();
//   }
//
//   loadBikes(): void {
//     this.bikeItems.loadItems(ItemTypeEnum.BIKE);
//   }
//
//   addBikes(): void {
//     this.bikeItems.addAll();
//   }
//
//   hideBikes(): void {
//     this.bikeItems.removeAll();
//   }
//
//   hideCars(): void {
//     this.carItems.removeAll();
//   }
//
//
//   addStreet(): void {
//     this.streetItems.addAll();
//   }
//
//   hideStreet(): void {
//     this.streetItems.removeAll();
//   }
//
//   loadStreet(): void {
//     this.bikeItems.loadItems(ItemTypeEnum.STREET);
//   }
//
//   getStreetLayer(): VectorLayer {
//     return this.streetItems.getLayer();
//   }
}
