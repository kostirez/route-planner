import {Injectable} from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import {MapService} from '../services/map.service';
import {Bike} from '../model/bike';
import {GeoJson} from '../model/geoJson';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import {GeoJSON} from 'ol/format';
import VectorSource from 'ol/source/Vector';


@Injectable({
  providedIn: 'root'
})
export class OlFuncService {

  constructor() {
  }

  getVectorSource(source: GeoJson<any>): VectorSource {
    let features;
    if (source.features.length !== 0) {
      console.log('source', source);
      features = new GeoJSON().readFeatures(source, {featureProjection: 'EPSG:3857'});
    }
    const vectorSource = new VectorSource({
      features: features
    });

    return vectorSource;
  }

  getCircleStyle(color: string): any {
    const styles = {
      Point: new Style({
        image: new Circle({
          radius: 3,
          fill: new Fill({'color': color}),
        })
      })
    };
    return styles;
  }
}
