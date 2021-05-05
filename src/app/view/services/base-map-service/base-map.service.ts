import {Injectable} from '@angular/core';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import LayerGroup from 'ol/layer/Group';


@Injectable({
  providedIn: 'root'
})
export class BaseMapService {

  baseMap: number;

  openStreetMapStandard: TileLayer;

  openStreetMapUrl: TileLayer;

  baseLayerGroup: LayerGroup;

  stamen: TileLayer;

  constructor() {
    this.initLayers();
  }

  initLayers(): void {
    this.openStreetMapStandard = new TileLayer({
      source: new OSM(),
      visible: true,
    });

    this.openStreetMapUrl = new TileLayer({
      source: new OSM({
        url: ''
      }),
      visible: false,
    });

    this.stamen = new TileLayer({
      source: new XYZ({
        url: 'http://tile.stamen.com/terrain/{z}/{x}/{y}.jpg'
        // attributions: ''
      }),
      visible: false,
    });

    this.baseLayerGroup = new LayerGroup({
      layers: [
        this.openStreetMapStandard,
        this.openStreetMapUrl,
        this.stamen
      ]
    });
  }

  setMap(mapNum: number): void {
    this.baseMap = mapNum;
    this.setVisibleLayer(mapNum);
  }

  getBaseMap(): number {
    return this.baseLayerGroup;
  }

  private setVisibleLayer(layerType: number): void {
    this.baseLayerGroup.getLayersArray().map( layer => layer.setVisible(false));
    switch (layerType) {
      case 1: this.openStreetMapStandard.setVisible(true); break;
      case 2: this.openStreetMapUrl.setVisible(true); break;
      case 3: this.stamen.setVisible(true); break;
    }
  }
}
