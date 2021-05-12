import {
  Component, Input, Output, EventEmitter,
  AfterViewInit, NgZone
} from '@angular/core';

// OpenLayer
import {Coordinate} from 'ol/coordinate';
import {View, Map} from 'ol';
import {fromLonLat} from 'ol/proj';
import {ScaleLine, defaults as DefaultControls} from 'ol/control';
import Overlay from 'ol/Overlay';


// map services

import VectorLayer from 'ol/layer/Vector';
import {BaseMapService} from '../../../services/base-map-service/base-map.service';
import {OverlayInfo} from '../../../model/overlay-info';
import {LayerControllerService} from '../../../controller/layer-controller.service';
import {toLonLat} from 'ol/proj';
import {GeoLocationService} from '../../../services/geo-location.service/geo-location.service';
import {RoutePlanningService} from '../../../services/route-plannig-service/route-planning.service';
import {MapStateService} from './service/map-state.service';

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

  overlayLayer: Overlay;

  overlayInfo: OverlayInfo;

  overlayShowDetail: boolean;

  showBox = false;

  layers: string[];

  constructor(private zone: NgZone,
              private baseMapService: BaseMapService,
              private layerControllerService: LayerControllerService,
              private geoLocationService: GeoLocationService,
              private routePlanningService: RoutePlanningService,
              private mapStateService: MapStateService) {
    this.layers = [];
    this.overlayInfo = new OverlayInfo();
  }

  ngAfterViewInit(): void {
    this.initMap();
    // if (!this.map) {
    //   this.zone.runOutsideAngular(() => this.initMap());
    // }

    setTimeout(() => {
      this.mapReady.emit(this.map);
    });

    this.map.on('click', (e) => {
      console.log('click');
      this.click(e);
    });

  }

  private initMap(): void {
    this.center = fromLonLat(this.center);
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
      maxZoom: 19.6,
      // minZoom: 11,

    });
    this.map = new Map({
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });

    this.addLayer(this.baseMapService.getBaseMap(), 'base');

    this.addLayers(this.layerControllerService.getAllLayers());

    this.initOverlay();

    this.map.on('moveend', () => {
      this.center = toLonLat(this.view.getCenter());
      this.zoom = this.view.getZoom();
      this.mapStateService.changeCoords(this.center);
      this.mapStateService.changeZoom(this.zoom);
      // this.layerControllerService.setMapState(this.zoom, this.center);
    });

    this.initCurrentPosition();
    this.initRouteLayer();
  }

  initCurrentPosition(): void {
    this.addLayer(this.geoLocationService.getLocationLayer(), 'myLocation');
  }

  initRouteLayer(): void{
    this.addLayer(this.routePlanningService.getLayer(), 'route');

  }

  addLayers(layers: { layer: VectorLayer, name: string }[]): void {
    layers.forEach((l) => {
      this.addLayer(l.layer, l.name);
      console.log('add layer: ', l.name);
    });

  }

  addLayer(layer: VectorLayer, name: string): void {
    if (this.layers.includes(name)) {
      return;
    }
    this.map.addLayer(layer);
  }

  private initOverlay(): void {
    this.overlayLayer = new Overlay({
      element: document.getElementById('popup')
    });
    console.log('adding overlay');
    this.map.addOverlay(this.overlayLayer);
  }

  click(e): void {
    this.showBox = false;

    this.map.forEachFeatureAtPixel(e.pixel,
      (feature, layer) => {
        try {
          this.showBox = true;
          this.overlayInfo.type = this.layerControllerService.getLayerNameById(layer.ol_uid);
          this.overlayInfo.name = feature.get('name');
          this.overlayInfo.company = feature.get('company');
          this.overlayShowDetail = true;
        } catch {
          this.overlayLayer = undefined;
        }
      });
    if (!this.showBox) {
      this.overlayShowDetail = false;
    }
    this.showBox = true;
    this.overlayLayer.setPosition(e.coordinate);
    this.overlayInfo.position = toLonLat(e.coordinate);
    console.log('showbox: ', this.showBox);
  }

  overlayHide(): void {
    this.overlayLayer.setPosition(undefined);
  }
}
