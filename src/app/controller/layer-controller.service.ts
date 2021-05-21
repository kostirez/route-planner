import {Injectable} from '@angular/core';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import {Layer} from './layer';
import {ILayerParams} from '../model/interfaces/ILayerParams';
import {OlFuncService} from '../services/ol-func-service/ol-func.service';
import {GolemioService} from '../services/database-service/golemio.service';
import {ICircleFilter} from '../model/interfaces/ICircleFilter';
import {ICoordinates} from '../model/interfaces/ICoordinates';
import {IItemsFilter} from '../model/interfaces/IItemsFilter';
import {RestAPIService} from '../services/database-service/rest-api.service';
import {SideMenuService} from '../view/components/side-menu/side-menu-service/side-menu.service';
import {MapStateService} from '../view/components/ol-map/service/map-state.service';

@Injectable({
  providedIn: 'root'
})
export class LayerControllerService {

  private layers: Layer<any>[];

  mapZoom: number;

  mapCenter: [number, number];

  itemsFilter: IItemsFilter;

  constructor(private olFuncService: OlFuncService,
              private golemioService: GolemioService,
              private restAPIService: RestAPIService,
              private sideMenuService: SideMenuService,
              private mapStateService: MapStateService) {
    this.sideMenuService.getMapMode()
      .subscribe(() => {
        console.log('mapMode');
        this.clearAll();
      });
  }

  getLayer(name: string): Layer<any> {
    return this.layers.find((l) => l.name === name);
  }

  getVectorLayer(name: string): VectorLayer {
    return this.getLayer(name).vectorLayer;
  }

  getAllLayers(): { layer: VectorLayer, name: string }[] {
    return this.layers.map((l) => {
      return {layer: l.vectorLayer, name: l.name};
    });
  }

  initLayers(layerParams: ILayerParams[]): void {
    this.layers = [];
    this.itemsFilter = {filter: []};
    layerParams.forEach((parm) => {
      this.layers.push(new Layer(parm, this.olFuncService, this.golemioService, this.restAPIService, this.sideMenuService, this.mapStateService));
    });
    console.log('layers are ready');
  }

  clearAll() {
    if (this.layers) {
      this.layers.forEach((layer) => {
        layer.removeAll();
      });
    }
  }


  getLayerNameById(id): string {
    return this.layers.find((layer) => layer.getOl_uid() === id).name;
  }
}
