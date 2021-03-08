import {
  Component, Input, Output, EventEmitter,
  AfterViewInit, NgZone
} from '@angular/core';

// OpenLayer
import {Coordinate} from 'ol/coordinate';
import {View, Map} from 'ol';
import {fromLonLat} from 'ol/proj';
import {ScaleLine, defaults as DefaultControls} from 'ol/control';

// const
import {baseLayerGroup} from '../const/map-layers';
import {setVisibleLayer} from '../const/map-layers';


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

  constructor(private zone: NgZone) {
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
    setVisibleLayer(0);
    this.map.addLayer(baseLayerGroup);

  }

}
