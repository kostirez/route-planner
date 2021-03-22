import {Component, Input, OnInit} from '@angular/core';
import {OverlayInfo} from '../../model/overlay-info';

@Component({
  selector: 'app-overlay-box',
  templateUrl: './overlay-box.component.html',
  styleUrls: ['./overlay-box.component.scss']
})
export class OverlayBoxComponent implements OnInit {

  @Input()
  overlayInfo: OverlayInfo;

  constructor() { }

  ngOnInit(): void {
  }

  getData(){
    console.log('data: ', this.overlayInfo);
  }

}
