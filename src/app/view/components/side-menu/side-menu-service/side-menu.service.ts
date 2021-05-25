import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IFilter} from '../../../../model/interfaces/IItemsFilter';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  private filterState: Subject<IFilter>;

  private mapMode: Subject<string>;

  constructor() {
    this.filterState = new Subject<IFilter>();
    this.mapMode = new Subject<string>();
  }

  changeFilter(filter: IFilter): void {
    this.filterState.next(filter);
  }

  getFilterState(): Observable<IFilter> {
    return this.filterState;
  }

  changeMapMode(mapType: string): void {
    this.mapMode.next(mapType);
  }

  getMapMode(): Observable<string> {
    return this.mapMode;
  }
}
