import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OverlayInfo} from '../../../model/overlay-info';
import {RoutePlanningService} from '../../../services/route-plannig-service/route-planning.service';

@Component({
  selector: 'app-overlay-box',
  templateUrl: './overlay-box.component.html',
  styleUrls: ['./overlay-box.component.scss']
})
export class OverlayBoxComponent implements OnInit {

  @Input()
  overlayInfo: OverlayInfo;

  @Input()
  showDetail: boolean;

  @Output()
  showBox = new EventEmitter<boolean>();

  constructor(private routePlanningService: RoutePlanningService) {
  }

  ngOnInit(): void {
    console.log('undefined', this.overlayInfo);
  }

  isDefined(): boolean {
    return Object.keys(this.overlayInfo).length > 0;
  }

  getData(): void {
    console.log('overlay data: ', this.overlayInfo);
  }

  setTo(): void {
    this.showBox.emit(false);
    this.routePlanningService.to = this.overlayInfo.position;
  }

  setFrom(): void {
    this.showBox.emit(false);
    console.log('position', this.overlayInfo.position);
    this.routePlanningService.from = this.overlayInfo.position;
  }
}
