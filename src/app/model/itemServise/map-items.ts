// import {GeoJson} from '../../view/model/geoJson';
// import VectorLayer from 'ol/layer/Vector';
// import {GeoJSON} from 'ol/format';
// import VectorSource from 'ol/source/Vector';
// import {OlFuncService} from '../../view/services/ol-func-service/ol-func.service';
// import {HttpService} from '../../view/services/httpService/http.service';
// import {ItemTypeEnum} from '../../view/model/item-type.enum';
// import {ParamsTree} from '../../view/model/params-tree';
// import {GeoFiltr, IgeoFiltr} from '../../interfaces/IgeoFiltr';
// import {GolemioService} from '../database-service/golemio.service';
// import {RestAPIService} from '../database-service/rest-api.service';
//
//
// export class MapItems<T> {
//
//   // private layer: VectorLayer;
//
//   // private source: VectorSource;
//
//   // private paramsTree: ParamsTree;
//
//   private items: GeoJson<T>[];
//
//   private type: string;
//
//   private lastLoad: Date;
//
//   private lastFilter: GeoFiltr;
//
//   private database: string;
//
//   constructor(private golemioService: GolemioService,
//               private restapiService: RestAPIService, database: string) {
//     this.items = [];
//
//
//     // this.initLayer();
//   }
//
//   // getLayer(): VectorLayer {
//   //   return this.layer;
//   // }
//
//   getType(): string {
//     return this.type;
//   }
//
//   getItems(geoFilter: GeoFiltr, params: {}): GeoJson<T>[]{
//
//   }
//
//   initLayer(): void {
//     this.source = this.olFuncService.getVectorSource(this.items);
//     const styles = this.olFuncService.getImage();
//     this.layer = new VectorLayer({
//       source: this.source,
//       style: styles
//       // (feature) => {
//       //   return styles[feature.getGeometry().getType()];
//       // },
//     });
//   }
//
//   private getFeatures(): any {
//     if (this.items.features.length !== 0) {
//       return new GeoJSON().readFeatures(this.items, {featureProjection: 'EPSG:3857'});
//     } else {
//       console.error('empty items', this.items);
//       return;
//     }
//   }
//
//   // addAll(): void {
//   //   const features = this.getFeatures();
//   //   if (!features) {
//   //     return;
//   //   }
//   //   console.log('adding features', features);
//   //   this.source.addFeatures(features);
//   // }
//   //
//   // removeAll(): void {
//   //   this.source.clear();
//   // }
//   //
//   // setLayer(filter: ParamsTree): void {
//   //   const features = this.getFeatures();
//   //   if (!features) {
//   //     return;
//   //   }
//   //   console.log(features);
//   // }
//
//   // setLayer(params: any): void {
//   //   console.log('items foreach', this.items);
//   //   this.items.features.forEach(feature => {
//   //     if (this.satisfiesParams(params, item)) {
//   //       showedItems.push(item);
//   //     }
//   //   });
//   //   this.source.clear();
//   //   // console.log('items', showedItems);
//   //   let features = [];
//   //   if (this.items.length !== 0) {
//   //     // features = new GeoJSON().readFeatures(showedItems, {featureProjection: 'EPSG:3857'});
//   //     features = new GeoJSON().readFeatures(this.items, {featureProjection: 'EPSG:3857'});
//   //     console.log('ted');
//   //   }
//   //   console.log('features', features);
//   //   this.source.addFeatures(features);
//   // }
//
//
//   // TODO
//   // loadItems(filtr: IgeoFiltr): void{
//   //
//   // }
//   // loadItems(type: ItemTypeEnum): void {
//   //   this.httpService.getMapItems(type)
//   //     .subscribe(items => {
//   //       this.items = items;
//   //       this.type = type;
//   //       console.log('items', typeof this.items);
//   //       // this.setParamsTree('company');
//   //     });
//   //   console.log('items', this.items);
//   // }
//
//
//
//
// }
