import {GolemioService} from '../services/database-service/golemio.service';
import {RestAPIService} from '../services/database-service/rest-api.service';
import {ICircleFilter, IMyApiFilter} from '../model/interfaces/ICircleFilter';
import {interval, Observable, Subject} from 'rxjs';
import {IGolemioFilter} from '../model/interfaces/IGolemioFilter';
import {GeoJson} from '../model/geoJson';
import {SideMenuService} from '../view/components/side-menu/side-menu-service/side-menu.service';
import {IFilter} from '../model/interfaces/IItemsFilter';
import {MapStateService} from '../view/components/ol-map/service/map-state.service';

export class ItemDatabase {

  // items: Observable<GeoJson<any>>;

  lastUpdate: Date;

  databaseName: string;

  type: string;

  private layerName: string;

  private running: boolean;

  private circleFilter: ICircleFilter;

  private filter: IFilter;

  subject: Subject<any>;

  constructor(private golemioService: GolemioService,
              private restAPIService: RestAPIService,
              private sideMenuService: SideMenuService,
              private mapStateService: MapStateService,
              type: string, databasseName: string, layerName) {
    this.type = type;
    this.running = false;
    this.databaseName = databasseName;
    this.layerName = layerName;
    this.subject = new Subject();
    this.circleFilter = {radius: 0, coordinates: null};
    this.sideMenuService.getFilterState().subscribe((filter) => {
      // console.log('filter65', filter);
      this.IFilterChange(filter);
    });
    this.mapStateService.getCoords().subscribe((coords) => {
      this.circleFilter.coordinates = coords;
      this.updateItems();
    });

    this.mapStateService.getZoom().subscribe((zoom) => {
      const oldRadius = this.circleFilter.radius;
      this.circleFilter.radius = this.getRadius(zoom);
      if (oldRadius < this.circleFilter.radius) {
        this.updateItems();
      }
    });
  }

  start(): void {
    console.log('start', this.type);
    if (!this.running) {
      this.running = true;
      this.updateItems();
      const subscription = interval(100000).subscribe(() => {
        this.updateItems();
        if (!this.running) {
          subscription.unsubscribe();
        }
      });
    } else {
      console.log('It\'s not running');
    }
  }

  stop(): void {
    this.running = false;
  }

  setFilter(circleFilter: ICircleFilter): void {
    // console.log('cir:', circleFilter);
    this.circleFilter = circleFilter;
    this.updateItems();
  }

  updateItems(): void {
    // console.log('updating items', this.circleFilter);

    if (this.filter != null && this.filter.name === this.layerName) {
      if (this.databaseName === 'golemio') {
        // console.log('golemio');
        this.golemioService.getItems(this.getGolemioFilter(this.circleFilter), this.type)
          .subscribe((items) => {
            // console.log('tady');
            items = this.filtrate(items);
            // console.log('items from golemio', items);
            this.subject.next(items);
          });
      } else {
        // console.log('api');
        const data = {
          'features': [],
          'type': 'FeatureCollection',
        };
        if (this.filter.subnames.length !== 0) {
          this.restAPIService.getItems(this.getMyAPIFilter(this.circleFilter), this.type)
            .subscribe((items) => {

              // @ts-ignore
              data.features = items;

              this.subject.next(data);
            });
        } else {
          this.subject.next(data);
        }
      }
    }
  }

  private getMyAPIFilter(circleFilter: ICircleFilter): IMyApiFilter {
    return {
      coordinates1: circleFilter.coordinates[0],
      coordinates2: circleFilter.coordinates[1],
      radius: circleFilter.radius
    };
  }

  private getGolemioFilter(circleFilter: ICircleFilter): IGolemioFilter {
    return {
      latlng: circleFilter.coordinates[1] + ',' + circleFilter.coordinates[0],
      range: circleFilter.radius,
      // companyName: companyname,
    };
  }

  private filtrate(items: GeoJson<any>): GeoJson<any> {
    const retArray = [];
    // console.log('ifilter', this.layerName);
    // console.log('ifilter', this.filter.name);
    // if (this.filter.subnames.length === 0) {
    //   // if (this.filter.name !== this.layerName) {
    //     items.features = [];
    //   // }
    // }

    if (items.features && items.features.length > 0 && items.features[0].properties.company) {
      // console.log('items filt2');
      items.features.forEach((item) => {
        // console.log('items filt', item.properties.company);
        if (this.filter.subnames.includes(item.properties.company.name)) {
          retArray.push(item);
        }
      });
      items.features = retArray;
    }
    if (this.filter.subnames.length === 0) {
      // if (this.filter.name !== this.layerName) {
        items.features = [];
      // }
    }
    // console.log('items filt2', items);
    return items;
  }

  public getItems(): Observable<GeoJson<any>> {
    return this.subject;
  }

  private IFilterChange(filter: IFilter): void {
    if (filter.name !== this.layerName) {
      return;
    }
    // console.log('jsem tu', filter);
    this.filter = filter;
    this.updateItems();
  }

  getRadius(zoom: number): number {
    return 100000 / zoom;
  }
}
