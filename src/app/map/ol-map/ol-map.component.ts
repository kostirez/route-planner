import {
  Component, Input, Output, EventEmitter,
  AfterViewInit, NgZone
} from '@angular/core';

// OpenLayer
import {Coordinate} from 'ol/coordinate';
import {View, Map} from 'ol';
import {fromLonLat} from 'ol/proj';
import {ScaleLine, defaults as DefaultControls} from 'ol/control';
import {GeoJSON} from 'ol/format';
import VectorSource from 'ol/source/Vector';
import Overlay from 'ol/Overlay';


// map services
import {MapService} from '../services/map.service';
import {Bike} from '../model/bike';
import {GeoJson} from '../model/geoJson';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import {BaseMapService} from '../services/base-map/base-map.service';
import {MapItemService} from '../services/itemServise/map-item.service';
import {OverlayInfo} from '../model/overlay-info';


@Component({
  selector: 'app-ol-map',
  templateUrl: './ol-map.component.html',
  styleUrls: ['./ol-map.component.scss']
})
export class OlMapComponent implements AfterViewInit {

  @Input() center: Coordinate;

  @Input() zoom: number;

  @Input() layer: string;

  @Output() mapReady = new EventEmitter<Map>();

  view: View;

  map: Map;

  layers: string[];

  overlayLayer: Overlay;

  overlayInfo: OverlayInfo;
  showBox = false;

  constructor(private zone: NgZone,
              private baseMapService: BaseMapService,
              private mapItemService: MapItemService) {
    this.layers = [];
    this.overlayInfo = new OverlayInfo();
  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }

    setTimeout(() => this.mapReady.emit(this.map));
    this.map.on('click', (e) => {
      this.click(e);
    });
  }

  private initMap(): void {
    this.center = fromLonLat(this.center);
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
    });
    this.map = new Map({
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });

    this.addLayer(this.baseMapService.getBaseMap(), 'base');
    this.addLayer(this.mapItemService.getBikeLayer(), 'bike');
    this.addLayer(this.mapItemService.getCarLayer(), 'car');
    this.addLayer(this.mapItemService.getCarLayer(), 'street');

    this.initOverlay();
  }

  private initOverlay(): void {
    this.overlayLayer = new Overlay({
      element: document.getElementById('overlay')
    });
    console.log('adding overlay');
    this.map.addOverlay(this.overlayLayer);
  }

  click(e): void {
    console.log('click', e);
    this.showBox = false;
    this.overlayLayer.setPosition(e.coordinate);
    this.map.forEachFeatureAtPixel(e.pixel,
      (feature, layer) => {
        this.showBox = true;
        this.overlayInfo.type = this.getTypeOfItem(layer);
        this.overlayInfo.name = feature.get('name');
        this.overlayInfo.company = feature.get('company');
        this.overlayInfo = feature;
        console.log('info', this.overlayInfo);
        console.log('feature and layer', feature.getKeys(), layer);
      });
    console.log('showbox: ', this.showBox);
  }

  addLayer(layer: VectorLayer, name: string): void {
    if (this.layers.includes(name)) {
      return;
    }
    this.map.addLayer(layer);
  }

  getTypeOfItem(layer): string {
    console.log('layer', layer.ol_uid);
    switch (layer.ol_uid) {
      case this.mapItemService.getCarLayer().ol_uid:
        return 'Car';
      case this.mapItemService.getBikeLayer().ol_uid:
        return 'Bike';
    }
  }

}
