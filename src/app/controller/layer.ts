import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {ILayerParams} from '../interfaces/ILayerParams';
import {OlFuncService} from '../view/services/ol-func-service/ol-func.service';
import {GeoJson, Geometry} from '../view/model/geoJson';
import {GeoJSON} from 'ol/format';
import {ItemTypeEnum} from '../view/model/item-type.enum';
import {GolemioService} from '../model/database-service/golemio.service';
import {ICircleFilter, IMyApiFilter} from '../interfaces/ICircleFilter';
import {ICoordinates} from '../interfaces/ICoordinates';
import {Observable} from 'rxjs';
import {IFilter} from '../interfaces/IItemsFilter';
import {IGolemioFilter} from '../interfaces/IGolemioFilter';
import {RestAPIService} from '../model/database-service/rest-api.service';
import {layersParams} from '../config/layerParams';
import {ItemDatabase} from './item-database';


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
              private restAPIService: RestAPIService) {
    this.params = layerParams;
    this.name = layerParams.name;
    this.items = [];
    this.itemDatabase = new ItemDatabase(golemioService, restAPIService, this.params.searchUrl, this.params.database);
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
        styles = this.olFuncService.getPolygon();
        break;
      case 'line2':
        styles = this.olFuncService.getLine2();
        break;
      case 'line3':
        styles = this.olFuncService.getLine3();
        break;
    }
    this.vectorLayer = new VectorLayer({
      source: this.source,
      style: styles
    });

  }

  setSourceFeatures(): void {
    this.itemDatabase.getItems()
      .subscribe((items) => {
        let feature = this.updateItems(items);
        // items.features = this.filterFeatures(feature, filter);
        console.log('ret', feature);
        if (feature.features.length !== 0) {
          feature = new GeoJSON().readFeatures(feature, {featureProjection: 'EPSG:3857'});
        } else {
          console.error('empty items', feature);
          return;
        }
        this.source.addFeatures(feature);
        console.log('features', this.source.getFeatures().length);
      });
  }

  // filterFeatures(feature, filter): any {
  //   if (filter.name === 'Car' || filter.name === 'Bike') {
  //     return feature.features.filter((f) => {
  //       return filter.subnames.includes(f.properties.company.name);
  //     });
  //   }
  // }

  removeAll(): void {
    this.source.clear();
    this.items = [];
  }

  updateItems(newItems): { features: any[], type: string } {
    // console.log('newItems:', newItems);
    let ret = [];
    if (newItems.features) {
      newItems = newItems.features;
    }

    newItems.forEach((newItem) => {
      // if (newItem.geometry.type === 'Point'){
      // if (!this.items.find((i) => {
      //   if (this.params.database === 'golemio') {
      //     return newItem.geometry.coordinates[0] === i.geometry.coordinates[0]
      //       && newItem.geometry.coordinates[1] === i.geometry.coordinates[1];
      //   } else {
      //     return true;
      //   }
      // })) {
        this.items.push(newItem); // { type: 'Feature', geometry: newItem.geometry});
        // console.log('push', newItem);
        ret.push(newItem);
      // }
    });
    return {
      features: ret,
      type: 'FeatureCollection',
    };
  }

  setVisibility(visible: boolean): void {
    this.vectorLayer.visible = visible;
    this.removeAll();
  }

  getVisibility(): boolean {
    return this.vectorLayer.visible;
  }

  setFilter(filter: IFilter, circleFilter: ICircleFilter): void {
    if (filter === undefined) {
      this.setVisibility(false);
      this.itemDatabase.stop();
    } else {
      this.itemDatabase.start();
      this.itemDatabase.setFilter(circleFilter); //  {coordinates: [ 14.451485800000000, 50.091417199999980], radius: 100000});
      this.setSourceFeatures();
      // this.itemsFilter(filter);
    }
  }

  // itemsFilter(filter: IFilter): void {
  //   console.log('a');
  //   let list = this.source.getFeatures();
  //   console.log('a', list);
  //
  // }

  getOl_uid(): any {
    console.log('vector', this.vectorLayer);
    return this.vectorLayer.ol_uid;
  }

  // setCoordinatesToFeature(index: number, coords: [number, number]): void {
  //   const featureToUpdate = this.source.getFeatures[0];
  //   featureToUpdate.getGeometry().setCoordinates(coords);
  // }
}
