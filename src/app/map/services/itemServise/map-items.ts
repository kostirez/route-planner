import {GeoJson} from '../../model/geoJson';
import VectorLayer from 'ol/layer/Vector';
import {GeoJSON} from 'ol/format';
import VectorSource from 'ol/source/Vector';
import {OlFuncService} from '../ol-func.service';
import {HttpService} from '../httpService/http.service';
import {ItemTypeEnum} from '../../model/item-type.enum';
import {ParamsTree} from '../../model/params-tree';


export class MapItems<T> {

  private layer: VectorLayer;

  private items: GeoJson<T>;

  private source: VectorSource;

  private paramsTree: ParamsTree;

  private type: string;

  constructor(private olFuncService: OlFuncService,
              private httpService: HttpService) {
    this.items = new GeoJson<T>();
    this.initLayer();
  }

  getLayer(): VectorLayer {
    return this.layer;
  }

  initLayer(): void {
    this.source = this.olFuncService.getVectorSource(this.items);
    const styles = this.olFuncService.getImage();
    this.layer = new VectorLayer({
      source: this.source,
      style: styles
      // (feature) => {
      //   return styles[feature.getGeometry().getType()];
      // },
    });
  }

  private getFeatures(): any {
    if (this.items.features.length !== 0) {
      return new GeoJSON().readFeatures(this.items, {featureProjection: 'EPSG:3857'});
    } else {
      console.error('empty items', this.items);
      return;
    }
  }

  addAll(): void {
    const features = this.getFeatures();
    if (!features) {
      return;
    }
    console.log('adding features', features);
    this.source.addFeatures(features);
  }

  removeAll(): void {
    this.source.clear();
  }

  setLayer(filter: ParamsTree): void {
    const features = this.getFeatures();
    if (!features) {
      return;
    }
    console.log(features);
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
        this.type = type;
        console.log('items', typeof this.items);
        // this.setParamsTree('company');
      });
    console.log('items', this.items);
  }

  setParamsTree(param: string): void {
    let categories: { categoryName: string, count: number }[];
    categories = [];
    // categories.find(aa => 2 > 2);
    const iterator = this.items.features.values();
    const values = [];
    for (const value of iterator) {
      const name = value.properties[param].name;
      if (categories.filter(e => e.categoryName === name).length > 0) {
        const index = categories.findIndex(category => name === category.categoryName);
        categories[index].count += 1;
      } else {
        categories.push({categoryName: name, count: 1});
      }
    }
    console.log('categories: ', categories);
  }

  // private satisfiesParams(params: any, item: GeoJson<T>): boolean {
  //   return true;
  // }
}
