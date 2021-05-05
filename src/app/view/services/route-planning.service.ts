import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {OlFuncService} from './ol-func-service/ol-func.service';
import {GeoJSON} from 'ol/format';
import {fromLonLat} from 'ol/proj';
import {RestAPIService} from '../../model/database-service/rest-api.service';


@Injectable({
  providedIn: 'root'
})
export class RoutePlanningService {

  set from(value: [number, number]) {
    console.log('set value', value);
    this._from.next(value);
  }

  set to(value: [number, number]) {
    this._to.next(value);
  }

  private _from: Subject<[number, number]>;

  private _to: Subject<[number, number]>;

  private source: VectorSource;
  private vectorLayer: VectorLayer;

  private toId: any;
  private fromId: any;

  constructor(private olFuncService: OlFuncService,
              private restAPIService: RestAPIService) {
    this._from = new Subject<[number, number]>();
    this._to = new Subject<[number, number]>();
    this.initLayer();
    this.getFrom().subscribe((value) => {
      this.updatePoint(this.fromId, value);
    });
    this.getTo().subscribe((value) => {
      this.updatePoint(this.toId, value);
    });
  }

  updatePoint(id, coords): void {
    console.log('id', id);
    const featureToUpdate = this.source.getFeatureById(id);
    featureToUpdate.getGeometry().setCoordinates(fromLonLat(coords));
  }

  initLayer(): void {
    this.source = this.olFuncService.getVectorSource({features: []});
    const styles = (feature) => {
      return this.olFuncService.getPlanningStyle()[feature.getGeometry().getType()];
    };
    this.vectorLayer = new VectorLayer({
      source: this.source,
      style: styles,
    });
    this.fromId = this.createPoint('from', [undefined, undefined]);
    this.toId = this.createPoint('to', [undefined, undefined]);
    console.log('from', this.fromId);
    console.log('to', this.toId);
  }

  createPoint(type: string, coords: [number, number]): any {
    const point = this.getPoint(coords, type);
    const features = new GeoJSON().readFeatures(point, {featureProjection: 'EPSG:3857'});
    this.source.addFeatures(features);
    const len = this.source.getFeatures().length;
    this.source.getFeatures()[len - 1].setId(type);
    return this.source.getFeatures()[len - 1].getId();
  }

  addRoute(routes): void {
    const features = new GeoJSON().readFeatures(routes, {featureProjection: 'EPSG:3857'});
    this.source.addFeatures(features);
  }

  findRoute(): void {
    console.log('geometry', this.source.getFeatureById(this.fromId).getGeometry());
    console.log('geometry', this.source.getFeatureById(this.toId).getGeometry());
    this.restAPIService.getRoute()
      .subscribe((routes) => {
        this.addRoute(routes);
      });
  }

  getFrom(): Subject<[number, number]> {
    return this._from;
  }

  getTo(): Subject<[number, number]> {
    return this._to;
  }

  getLayer(): VectorLayer {
    return this.vectorLayer;
  }

  private getPoint(coords, pointName): {} {
    return {
      features: [{
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
        properties: {
          name: pointName
        },
        type: 'Feature'
      }],
      type: 'FeatureCollection',
    };
  }
}
