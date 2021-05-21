import {Injectable} from '@angular/core';
import {GeoJson} from '../../model/geoJson';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {OlFuncService} from '../ol-func-service/ol-func.service';
import { interval } from 'rxjs';
import {GeoJSON} from 'ol/format';
import {fromLonLat} from 'ol/proj';



@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  private lat: number;
  private lng: number;

  private source: VectorSource;
  private vectorLayer: VectorLayer;

  private item: any;

  constructor(private olFuncService: OlFuncService) {
    interval(10000).subscribe(() => {
      this.updateLocation();
    });
    this.initItem();
    this.initLayer();
  }

  updateLocation(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
      this.updateLayer();
    });
  }

  getLocation(): [number, number] {
    return [this.lat, this.lng];
  }

  getLocationPromise(): Promise<[number, number]> {
    if (navigator.geolocation) {
      return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(position => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          console.log('position', position);
          resolve([this.lat, this.lng]);
        });
      });
    }
  }

  private initItem(): void {
    this.item = {
      'features': [{
        geometry: {
          type: 'Point',
          coordinates: [],
        },
        properties: {
          name: 'YourPosition'
        },
        type: 'Feature'
      }],
      type: 'FeatureCollection',
    };
  }
  getLocationLayer(): VectorLayer {
    return this.vectorLayer;
  }

  initLayer(): void {
    this.source = this.olFuncService.getVectorSource(this.item);
    const styles = this.olFuncService.getPoint();
    this.vectorLayer = new VectorLayer({
      source: this.source,
      style: styles,
    });
  }

  updateLayer(): void {
    console.log('update position', this.source.getFeatures());
    if (this.source.getFeatures().length !== 0){
      console.log('not empty');
      const featureToUpdate = this.source.getFeatures()[0];
      featureToUpdate.getGeometry().setCoordinates(fromLonLat([this.lng, this.lat]));
    } else {
      const features = new GeoJSON().readFeatures(this.item, {featureProjection: 'EPSG:3857'});
      console.log('empty ...features: ', features);
      this.source.addFeatures(features);
    }
  }
}
