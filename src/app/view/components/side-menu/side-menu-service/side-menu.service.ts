import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IFilter, IItemsFilter} from '../../../../model/interfaces/IItemsFilter';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {

  filterState: Subject<IFilter>;

  constructor() {
    this.filterState = new Subject<IFilter>();
  }

  changeFilter(filter: IFilter): void {
    this.filterState.next(filter);
  }

  getFilterState(): Observable<IFilter> {
    return this.filterState;
  }
}
