import {Injectable} from '@angular/core';
import {GeoJson} from '../../model/geoJson';
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
    console.log('fetures: ', features);
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

  getPoint(): any {
    return new Style({
      image: new Circle({
        radius: 5,
        fill: new Fill({color: 'blue'}),
      })
    });
  }

  getImage(picName: string): any {
    return new Style({
      image: new Icon({
        src: 'assets/pic/' + picName + '.png',
        width: 2,
      }),
    });
  }

  getLine(): any {
    return new Style({
      stroke: new Stroke({
        color: 'red',
        width: 2,
      }),
    });
  }

  getPolygon(): any {
    return new Style({
      stroke: new Stroke({
        color: 'blue',
        lineDash: [4],
        width: 3,
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0.1)',
      }),
    });
  }

  getLine2(): any {
    return new Style({
      stroke: new Stroke({
        color: 'black',
        width: 2,
      }),
    });
  }

  getLine3(): any {
    return new Style({
      stroke: new Stroke({
        color: 'purple',
        width: 2,
      }),
    });
  }

  getPlanningStyle(): any {
    return {
      'Point': new Style({
        image: new Circle({
          fill: new Fill({
            color: 'rgb(239,216,8)'
          }),
          radius: 7,
          stroke: new Stroke({
            color: '#7513e5',
            width: 3
          })
        })
      }),
      'LineString': new Style({
        stroke: new Stroke({
          color: '#f00',
          width: 5
        })
      })
    };
  }


}
