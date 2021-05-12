import {Component, OnInit} from '@angular/core';
import {GeoLocationService} from '../../../services/geo-location.service/geo-location.service';
import {RoutePlanningService} from '../../../services/route-plannig-service/route-planning.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  FromCoords: [number, number];

  ToCoords: [number, number];

  from: string;

  to: string;

  constructor(private geoLocationService: GeoLocationService,
              private routePlanningService: RoutePlanningService) {
  }

  ngOnInit(): void {
    this.routePlanningService.getFrom()
      .subscribe((from) => {
        this.from = from[0] + ', ' + from[1];
      });
    this.routePlanningService.getTo()
      .subscribe((to) => {
        this.to = to[0] + ', ' + to[1];
      });
  }

  async getLocation(): Promise<void> {
    await this.geoLocationService.getLocationPromise()
      .then((coords) => {
        if (this.from === 'My location') {
          this.from += coords[0] + ',' + coords[1];
        }
        if (this.to === 'My location') {
          this.to += coords[0] + ',' + coords[1];
        }
      });
  }

  setFrom(location: string): void {
    if (location === 'My location') {
      this.getLocation();
    }
    this.from = location;
  }

  setTo(location: string): void {
    if (location === 'My location') {
      this.getLocation();
    }
    this.to = location;
  }

  switch(): void {
    const newTo = this.from;
    this.from = this.to;
    this.to = newTo;
  }

  onFocus(): void {
    console.log('asdfasfas');
  }

  search(): void {
    this.routePlanningService.findRoute();
  }
}