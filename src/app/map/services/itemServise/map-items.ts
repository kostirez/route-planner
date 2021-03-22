import {GeoJson} from '../../model/geoJson';
import VectorLayer from 'ol/layer/Vector';
import {GeoJSON} from 'ol/format';
import VectorSource from 'ol/source/Vector';
import {OlFuncService} from '../ol-func.service';
import {HttpService} from '../httpService/http.service';
import {ItemTypeEnum} from '../../model/item-type.enum';


export class MapItems<T> {

  private layer: VectorLayer;

  private items: GeoJson<T>;

  private source: VectorSource;

  constructor(private olFuncService: OlFuncService,
              private httpService: HttpService) {
    this.items = new GeoJson<T>();
    this.initLayer();
  }

  getLayer(): VectorLayer {
    return this.layer;
  }

  initLayer(): void {
    console.log('init layer', typeof this.items);
    this.source = this.olFuncService.getVectorSource(this.items);
    const styles = this.olFuncService.getCircleStyle('blue');
    this.layer = new VectorLayer({
      source: this.source,
      style: (feature) => {
        return styles[feature.getGeometry().getType()];
      },
    });
  }

  addAll(): void {
    let features;
    if ( this.items.features.length !== 0) {
      features = new GeoJSON().readFeatures(this.items, {featureProjection: 'EPSG:3857'});
    } else {
      console.error('empty items');
      return;
    }
    console.log('adding features', features);
    this.source.addFeatures(features);
  }

  removeAll(): void {
    this.source.clear();
  }

  // setLayer(params: any): void {
  //   console.log('items foreach', this.items);
  //   this.items.features.forEach(feature => {
  //     if (this.satisfiesParams(params, item)) {
  //       showedItems.push(item);
  //     }
  //   });
  //   this.source.clear();
  //   // console.log('items', showedItems);
  //   let features = [];
  //   if (this.items.length !== 0) {
  //     // features = new GeoJSON().readFeatures(showedItems, {featureProjection: 'EPSG:3857'});
  //     features = new GeoJSON().readFeatures(this.items, {featureProjection: 'EPSG:3857'});
  //     console.log('ted');
  //   }
  //   console.log('features', features);
  //   this.source.addFeatures(features);
  // }

  loadItems(type: ItemTypeEnum): void {
    this.httpService.getMapItems(type)
      .subscribe(items => {
        this.items = items;
        console.log('items', this.items);
      });
  }

  // private satisfiesParams(params: any, item: GeoJson<T>): boolean {
  //   return true;
  // }
}
