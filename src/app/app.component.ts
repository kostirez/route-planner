import {Component, OnInit} from '@angular/core';
import {LayerControllerService} from './controller/layer-controller.service';
import {layersParams} from './config/layerParams';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  animations: [
    trigger('expandCollapse', [
      state('open', style({
        'height': '*'
      })),
      state('close', style({
        'height': '0px'
      })),
      transition('open <=> close', animate('300ms ease-out'))
    ])
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'route-planner';

  showFilter = true;

  openCloseAnim = 'open';

  mobileView: boolean;

  constructor(private layerControllerService: LayerControllerService,
              private translate: TranslateService) {
    translate.setDefaultLang('cz');
  }

  onMapReady(event: any): void {
    console.log('Map Ready');
  }

  ngOnInit(): void {
    this.layerControllerService.initLayers(layersParams);
    this.mobileView = window.screen.orientation.type === 'portrait-primary';
    this.showFilter = !this.mobileView;
  }

  openFilters(open: boolean): void {
    this.openCloseAnim = (this.openCloseAnim == 'open') ? 'close' : 'open';
    this.showFilter = open;
  }

}
