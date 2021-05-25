import {Component, OnInit} from '@angular/core';
import {GeoLocationService} from '../../../services/geo-location.service/geo-location.service';
import {RoutePlanningService} from '../../../services/route-plannig-service/route-planning.service';
import {SideMenuService} from '../side-menu/side-menu-service/side-menu.service';

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

  mapMode: string;

  searching = false;

  fromError = false;

  toError = false;

  searchError = false;

  constructor(private geoLocationService: GeoLocationService,
              private routePlanningService: RoutePlanningService,
              private sideMenuService: SideMenuService) {
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
    this.sideMenuService.getMapMode()
      .subscribe((mapMode) => {
        this.mapMode = mapMode;
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
    console.log('mapMode;', this.mapMode);
    this.fromError = !this.from;
    this.toError = !this.to;
    if (this.fromError || this.toError) {
      return;
    }else{
      this.searching = true;
      this.searchError = false;
      this.routePlanningService.findRoute(this.mapMode)
        .then(() => {
          this.searching = false;
        })
        .catch((e) => {
          console.log('error', e);
          this.searching = false;
          this.searchError = true;
        });
    }
    // this.routePlanningService.findRoute('shareBike');
    // this.routePlanningService.findRoute('sepcia...');
  }
}
