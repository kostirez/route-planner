import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {ILayerParams} from '../model/interfaces/ILayerParams';
import {OlFuncService} from '../services/ol-func-service/ol-func.service';
import {GeoJson, Geometry} from '../model/geoJson';
import {GeoJSON} from 'ol/format';
import {ItemTypeEnum} from '../model/item-type.enum';
import {GolemioService} from '../services/database-service/golemio.service';
import {ICircleFilter, IMyApiFilter} from '../model/interfaces/ICircleFilter';
import {ICoordinates} from '../model/interfaces/ICoordinates';
import {Observable} from 'rxjs';
import {IFilter} from '../model/interfaces/IItemsFilter';
import {IGolemioFilter} from '../model/interfaces/IGolemioFilter';
import {RestAPIService} from '../services/database-service/rest-api.service';
import {layersParams} from '../config/layerParams';
import {ItemDatabase} from './item-database';
import {SideMenuService} from '../view/components/side-menu/side-menu-service/side-menu.service';
import {MapStateService} from '../view/components/ol-map/service/map-state.service';
import {toLonLat} from 'ol/proj';

export class Layer<T> {


  vectorLayer: VectorLayer;

  private source: VectorSource;

  name: string;

  private items: any[];

  private params: ILayerParams;

  private itemDatabase: ItemDatabase;

  constructor(layerParams: ILayerParams,
              private olFuncService: OlFuncService,
              private golemioService: GolemioService,
              private restAPIService: RestAPIService,
              private sideMenuService: SideMenuService,
              private mapStateService: MapStateService) {
    this.params = layerParams;
    this.name = layerParams.name;
    this.items = [];
    this.itemDatabase = new ItemDatabase(golemioService, restAPIService, sideMenuService, mapStateService,
      this.params.searchUrl, this.params.database, this.name);
    this.itemDatabase.getItems().subscribe((items) => {
      this.removeAll();
      this.addItems(items);
      // this.addItems(this.findNewItems(items));
    });
    this.initLayer();
  }

  initLayer(): void {
    this.source = this.olFuncService.getVectorSource({features: []});
    let styles;
    switch (this.params.layerType) {
      case 'line':
        styles = this.olFuncService.getLine();
        break;
      case 'point':
        styles = this.olFuncService.getImage(this.name);
        break;
      case 'polygon':
        styles = this.olFuncService.getPolygon('blue');
        break;
      case 'polygonRed':
        styles = this.olFuncService.getPolygon('red');
        break;
      case 'line2':
        styles = this.olFuncService.getLine2();
        break;
      case 'line3':
        styles = this.olFuncService.getLine3();
        break;
      case 'line4':
        styles = this.olFuncService.getLine4();
        break;
      case 'line5':
        styles = this.olFuncService.getLine5();
        break;
    }
    this.vectorLayer = new VectorLayer({
      source: this.source,
      style: styles
    });

  }

  // setSourceFeatures(): void {
  //   this.itemDatabase.getItems()
  //     .subscribe((items) => {
  //       let feature = this.updateItems(items);
  //       // items.features = this.filterFeatures(feature, filter);
  //       console.log('ret', feature);
  //       if (feature.features.length !== 0) {
  //         feature = new GeoJSON().readFeatures(feature, {featureProjection: 'EPSG:3857'});
  //       } else {
  //         console.error('empty items', feature);
  //         return;
  //       }
  //       this.source.addFeatures(feature);
  //       console.log('features', this.source.getFeatures().length);
  //       console.log('array geometry', this.source.getFeatures()[0].getGeometry());
  //     });
  // }

  addItems(items: GeoJson<any>): void {
    // console.log('adding items', items);
    // const data = {
    //   'features': items,
    //   'type': 'FeatureCollection',
    // };

    const feature = new GeoJSON().readFeatures(items, {featureProjection: 'EPSG:3857'});
    this.source.addFeatures(feature);
    // console.log('add items: features', this.source.getFeatures().length);
    // console.log('array geometry', this.source.getFeatures()[0].getGeometry().getCoordinates());

  }

  findNewItems(items: GeoJson<any>): GeoJson<any> {
    // console.log('find new items', items);
    const geoJson = Object.assign({}, items);
    geoJson.features = [];
    items.features.forEach((feature) => {
      if (!this.isFeatureInSource(feature)) {
        geoJson.features.push(feature);
        // console.log('adddddddd');
      }
    });

    return geoJson;
  }

  isFeatureInSource(feature: any): boolean {
    const coords = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
    const features = this.source.getFeatures();
    let ret = false;
    features.forEach((f) => {
      const coords2 = toLonLat(f.getGeometry().getCoordinates());
      coords2[0] = Math.round(coords2[0] * 10000) / 10000;
      coords2[1] = Math.round(coords2[1] * 10000) / 10000;
      coords[0] = Math.round(coords[0] * 10000) / 10000;
      coords[1] = Math.round(coords[1] * 10000) / 10000;
      if (coords2[0] === coords[0] && coords2[1] === coords[1]) {
        // console.log('je to stejny', coords2, coords);
        ret = true;
        return;
      }
    });
    return ret;
  }

  removeAll(): void {
    this.source.clear();
    this.items = [];
  }

  // updateItems(newItems): { features: any[], type: string } {
  //   // console.log('newItems:', newItems);
  //   let ret = [];
  //   if (newItems.features) {
  //     newItems = newItems.features;
  //   }
  //
  //   newItems.forEach((newItem) => {
  //     // if (newItem.geometry.type === 'Point'){
  //     // if (!this.items.find((i) => {
  //     //   if (this.params.database === 'golemio') {
  //     //     return newItem.geometry.coordinates[0] === i.geometry.coordinates[0]
  //     //       && newItem.geometry.coordinates[1] === i.geometry.coordinates[1];
  //     //   } else {
  //     //     return true;
  //     //   }
  //     // })) {
  //     this.items.push(newItem); // { type: 'Feature', geometry: newItem.geometry});
  //     // console.log('push', newItem);
  //     ret.push(newItem);
  //     // }
  //   });
  //   return {
  //     features: ret,
  //     type: 'FeatureCollection',
  //   };
  // }

  setVisibility(visible: boolean): void {
    this.vectorLayer.visible = visible;
    this.removeAll();
  }

  getVisibility(): boolean {
    return this.vectorLayer.visible;
  }

  getOl_uid(): any {
    // console.log('vector', this.vectorLayer);
    return this.vectorLayer.ol_uid;
  }

}
