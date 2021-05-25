import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MapMode} from '../../../model/map-mode.enum';
import {mode, layersParams} from '../../../config/layerParams';
import {ThemePalette} from '@angular/material/core';
import {ILayerParams} from '../../../model/interfaces/ILayerParams';
import {SideMenuService} from './side-menu-service/side-menu.service';
import {IFilter, IItemsFilter} from '../../../model/interfaces/IItemsFilter';


export interface Task {
  name: string;
  completed: boolean;
  color?: ThemePalette;
  subtasks?: Task[];
  allComplete?: boolean;
  show?: boolean;
}

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  mapMode: MapMode;

  modes: any[];

  checkBoxTree: Task[];

  layersParams: ILayerParams[] = layersParams;

  constructor(private sideMenuService: SideMenuService) {
    this.modes = mode;

    this.initCheckboxes();

  }

  ngOnInit(): void {
    this.mapMode = 1;
    this.sideMenuService.changeMapMode(MapMode[this.mapMode]);
  }

  changeMapMode(num: number): void {
    this.clearFilter();
    this.mapMode = MapMode[MapMode[num]];
    this.sideMenuService.changeMapMode(MapMode[num]);
    // console.log('type: ', this.mapMode);
  }

  initCheckboxes(): void {
    this.checkBoxTree = [];
    this.layersParams.forEach((l) => {
      const subnames = l.subnames.map((sub) => {
        return {name: sub, completed: false};
      });
      this.checkBoxTree.push({
        name: l.name,
        completed: false,
        color: 'primary',
        subtasks: subnames,
        allComplete: false,
        show: true,
      });
    });
    // console.log('checkbox', this.checkBoxTree);
  }

  updateAllComplete(name: string): void {
    const task = this.getCheckBoxTree(name);
    task.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
    this.filterChange(this.getIfilterFromTask(task));
  }

  someComplete(name: string): boolean {
    const task = this.getCheckBoxTree(name);
    if (task.subtasks == null) {
      return false;
    }
    return task.subtasks.filter(t => t.completed).length > 0 && !task.allComplete;
  }


  setAll(completed: boolean, name: string): void {
    const task = this.getCheckBoxTree(name);
    if (task.allComplete === completed) {
      return;
    }
    task.allComplete = completed;
    if (task.subtasks == null) {
      return;
    }
    task.subtasks.forEach(t => t.completed = completed);
    this.filterChange(this.getIfilterFromTask(task));
  }

  getCheckBoxTree(name: string): Task {
    return this.checkBoxTree.find((box) => box.name === name);
  }

  getIfilterFromTask(task: Task): IFilter {
    const ret = {
      name: task.name,
      subnames: []
    };
    task.subtasks.forEach((subT) => {
      if (subT.completed) {
        ret.subnames.push(subT.name);
      }
    });
    if (task.subtasks.length === 0 && task.allComplete) {
      ret.subnames.push(task.name);
    }
    return ret;
  }

  clearFilter(): void {
    const item = this.modes.find((m) => m.name === MapMode[this.mapMode]);
    item.layers.forEach((name) => {

      this.setAll(false, name);

    });

    // this.modes[this.mapMode].layers.forEach((layerName) => {
    //   console.log('layerName:  ', this.mapMode, layerName);
    //
    // });

  }

  showSubtask(name: string): boolean {
    return this.getCheckBoxTree(name).show;
  }

  setShow(name: string): void {
    this.getCheckBoxTree(name).show = !this.getCheckBoxTree(name).show;
  }

  filterChange(filter: IFilter): void {
    this.sideMenuService.changeFilter(filter);
  }

}
