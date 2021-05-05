import {GolemioService} from '../model/database-service/golemio.service';
import {RestAPIService} from '../model/database-service/rest-api.service';
import {ICircleFilter, IMyApiFilter} from '../interfaces/ICircleFilter';
import {interval, Observable, Subject} from 'rxjs';
import {IGolemioFilter} from '../interfaces/IGolemioFilter';
import {GeoJson} from '../view/model/geoJson';

export class ItemDatabase {

  // items: Observable<GeoJson<any>>;

  lastUpdate: Date;

  databaseName: string;

  type: string;

  private running: boolean;

  private circleFilter: ICircleFilter;

  subject: Subject<any>;

  constructor(private golemioService: GolemioService,
              private restAPIService: RestAPIService,
              type: string, databasseName: string) {
    this.type = type;
    this.running = false;
    this.databaseName = databasseName;
    this.subject = new Subject();
  }

  start(): void {
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
    console.log('cir:', circleFilter);
    this.circleFilter = circleFilter;
    this.updateItems();
  }

  updateItems(): void {
    console.log('updating items');
    if (this.circleFilter) {
      if (this.databaseName === 'golemio') {
        this.golemioService.getItems(this.getGolemioFilter(this.circleFilter), this.type)
          .subscribe((items) => {
            this.subject.next(items);
          });
      } else {
        this.restAPIService.getItems(this.getMyAPIFilter(this.circleFilter), this.type)
          .subscribe((items) => {
            this.subject.next(items);
          });
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

  public getItems(): Observable<GeoJson<any>> {
    return this.subject;
  }
}
