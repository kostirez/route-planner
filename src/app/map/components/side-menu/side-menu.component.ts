import {Component, OnInit} from '@angular/core';
import {BaseMapService} from '../../services/base-map/base-map.service';
import {MapItemService} from '../../services/itemServise/map-item.service';
import {MapMode} from '../../model/map-mode.enum';
import {ParamsTree} from '../../model/params-tree';



@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  mapType: MapMode;

  bikes: ParamsTree;

  allComplete = false;

  constructor(private baseMapService: BaseMapService,
              private mapItemService: MapItemService) {
  }

  ngOnInit(): void {
    this.mapType = MapMode.BikeMode;
  }





  // updateAllComplete(): void {
  //   this.allComplete = this.bikes.subtasks != null && this.bikes.subtasks.every(t => t.completed);
  // }
  //
  // someComplete(): boolean {
  //   if (this.bikes.subtasks == null) {
  //     return false;
  //   }
  //   return this.bikes.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }
  //
  // setAll(completed: boolean): void {
  //   this.allComplete = completed;
  //   if (this.bikes.subtasks == null) {
  //     return;
  //   }
  //   this.bikes.subtasks.forEach(t => t.completed = completed);
  // }


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

  changeMapType(num: number): void {
    this.mapType = MapMode[MapMode[num]];
    console.log('type: ', this.mapType);
  }

  loadStreets(): void {
    this.mapItemService.loadStreet();
  }

  showStreets():void {
    this.mapItemService.addStreet();
  }

  hideStreets(): void {
    this.mapItemService.hideStreet();
  }
}
