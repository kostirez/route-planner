import {Injectable} from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import {MapService} from '../services/map.service';
import {Bike} from '../model/bike';
import {GeoJson} from '../model/geoJson';
import {Circle, Fill, Stroke, Style, Icon} from 'ol/style';
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

  getImage(): void{
    const fill = new Fill({
      color: 'rgb(227,20,20,1)'
    });
    const stroke = new Stroke({
      color: '#3399CC',
      width: 1.25
    });
    return new Style({
      image: new Icon({
        // anchor: [0.5, 46],
        // anchorXUnits: 'fraction',
        // anchorYUnits: 'pixels',
        src: 'assets/pic/bike.png',
        color: 'rgb(227,20,20,1)',
      }),


    });
  }
}
