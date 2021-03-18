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


// map services
import {MapService} from '../services/map.service';
import {Bike} from '../model/bike';
import {GeoJson} from '../model/geoJson';
import {Circle, Fill, Stroke, Style} from 'ol/style';
import VectorLayer from 'ol/layer/Vector';
import {BaseMapService} from '../services/base-map/base-map.service';
import {MapItemService} from '../services/itemServise/map-item.service';


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

  constructor(private zone: NgZone,
              private baseMapService: BaseMapService,
              private mapItemService: MapItemService) {
    this.layers = [];

  }

  ngAfterViewInit(): void {
    if (!this.map) {
      this.zone.runOutsideAngular(() => this.initMap());
    }
    setTimeout(() => this.mapReady.emit(this.map));
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

  }



  addLayer(layer: VectorLayer, name: string): void {
    if (this.layers.includes(name)) {
      return;
    }
    this.map.addLayer(layer);
  }

}
