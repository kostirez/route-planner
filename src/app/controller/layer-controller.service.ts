import {Injectable} from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Layer} from './layer';
import {ILayerParams} from '../interfaces/ILayerParams';
import {OlFuncService} from '../view/services/ol-func-service/ol-func.service';
import {GolemioService} from '../model/database-service/golemio.service';
import {ICircleFilter} from '../interfaces/ICircleFilter';
import {ICoordinates} from '../interfaces/ICoordinates';
import {IItemsFilter} from '../interfaces/IItemsFilter';
import {RestAPIService} from '../model/database-service/rest-api.service';

@Injectable({
  providedIn: 'root'
})
export class LayerControllerService {

  private layers: Layer<any>[];

  mapZoom: number;

  mapCenter: [number, number];

  itemsFilter: IItemsFilter;

  constructor(private olFuncService: OlFuncService,
              private golemioService: GolemioService,
              private restAPIService: RestAPIService ) {
  }

  getLayer(name: string): Layer<any> {
    return this.layers.find((l) => l.name === name);
  }

  getVectorLayer(name: string): VectorLayer {
    return this.getLayer(name).vectorLayer;
  }

  getAllLayers(): { layer: VectorLayer, name: string }[] {
    return this.layers.map((l) => {
      return {layer: l.vectorLayer, name: l.name};
    });
  }

  initLayers(layerParams: ILayerParams[]): void {
    this.layers = [];
    this.itemsFilter = {filter: []};
    layerParams.forEach((parm) => {
      this.layers.push(new Layer(parm, this.olFuncService, this.golemioService, this.restAPIService));
    });
    console.log('layers are ready');
  }

  // filterDataInLayer(name: string, geoFilter: ICircleFilter): void {
  //   this.getLayer(name).setData(geoFilter);
  // }

  setMapState(zoom: number = this.mapZoom, center: [number, number] = this.mapCenter): void {
    this.mapZoom = zoom;
    this.mapCenter = center;
    console.log('setMapState', this.mapZoom, this.mapCenter);
    this.setFilters();
  }

  setItemsFilter(filter: IItemsFilter): void {
    this.itemsFilter = filter;
    console.log('filter', filter);
    this.setFilters();
  }

  setFilters(): void {
    this.layers.forEach((layer) => {
      const filter = this.itemsFilter.filter
        .find((f) => f.name === layer.name);
      const circleFilter: ICircleFilter = {coordinates: this.mapCenter, radius: this.getRadius()};
      layer.setFilter(filter, circleFilter);
    });
  }

  getRadius(): number {
    return 100000 / this.mapZoom;
  }

  getLayerNameById(id): string{
    return this.layers.find((layer) => layer.getOl_uid() === id).name;
  }
}
