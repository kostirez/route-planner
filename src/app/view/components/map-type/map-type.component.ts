import {Component, OnInit} from '@angular/core';
import {MapMode} from '../../model/map-mode.enum';
import {BaseMapService} from '../../services/base-map-service/base-map.service';

@Component({
  selector: 'app-map-type',
  templateUrl: './map-type.component.html',
  styleUrls: ['./map-type.component.scss']
})
export class MapTypeComponent implements OnInit {

  mapType: MapMode;

  show: boolean;

  constructor(private baseMapService: BaseMapService) {
  }

  ngOnInit(): void {
    this.show = false;
  }

  changeMap(mapNum: number): void {
    this.baseMapService.setMap(mapNum);
    this.show = false;
  }


}
