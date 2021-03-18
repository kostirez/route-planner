import {Component, OnInit} from '@angular/core';
import {BaseMapService} from '../services/base-map/base-map.service';
import {MapItemService} from '../services/itemServise/map-item.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  constructor(private baseMapService: BaseMapService,
              private mapItemService: MapItemService) {
  }

  ngOnInit(): void {
  }

  changeMap(mapNum: number): void {
    this.baseMapService.setMap(mapNum);
  }

  loadBikes(): void {
    this.mapItemService.loadBikes();
  }

  showBikes(): void {
    this.mapItemService.addBikes();
  }

  hideBikes(): void {
    this.mapItemService.hideBikes();
  }

  loadCars(): void {
    this.mapItemService.loadCars();
  }

  showCars(): void {
    this.mapItemService.addCars();
  }

  hideCars(): void {
    this.mapItemService.hideCars();
  }
}
