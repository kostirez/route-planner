import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {MapMode} from '../../model/map-mode.enum';
import {ParamsTree} from '../../model/params-tree';
import {mode, layersParams} from '../../../config/layerParams';
import {ThemePalette} from '@angular/material/core';
import {ILayerParams} from '../../../interfaces/ILayerParams';
import {LayerControllerService} from '../../../controller/layer-controller.service';


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

  mapType: MapMode;

  bikes: ParamsTree;

  modes: any[];

  checkBoxTree: Task[];

  layersParams: ILayerParams[] = layersParams;

  constructor(private layerControllerService: LayerControllerService) {
    this.mapType = 0;
    this.modes = mode;
    this.initCheckboxes();
    console.log('modes', this.modes);
  }

  ngOnInit(): void {
    this.mapType = 0;
  }

  changeMapType(num: number): void {
    this.mapType = MapMode[MapMode[num]];
    console.log('type: ', this.mapType);
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
    console.log('checkbox', this.checkBoxTree);
  }

  updateAllComplete(name: string): void {
    const task = this.getLayersParams(name);
    console.log('all');
    task.allComplete = task.subtasks != null && task.subtasks.every(t => t.completed);
    this.filterChange();
  }

  someComplete(name: string): boolean {
    const task = this.getLayersParams(name);
    if (task.subtasks == null) {
      return false;
    }
    return task.subtasks.filter(t => t.completed).length > 0 && !task.allComplete;
  }

  setAll(completed: boolean, name: string): void {
    const task = this.getLayersParams(name);
    task.allComplete = completed;
    if (task.subtasks == null) {
      return;
    }
    task.subtasks.forEach(t => t.completed = completed);
    this.filterChange();
  }

  getLayersParams(name: string): Task {
    return this.checkBoxTree.find((box) => box.name === name);
  }

  showSubtask(name: string): boolean {
    return this.getLayersParams(name).show;
  }

  setShow(name: string): void {
    this.getLayersParams(name).show = !this.getLayersParams(name).show;
  }

  filterChange(): void {
    const filterArray = this.checkBoxTree.map(task => {
      const subnamess = task.subtasks.map(subtask => {
        if (subtask.completed) {
          return subtask.name;
        }
      }).filter(text => text);

      if (subnamess.length === 0 && !task.allComplete) {
        return null;
      }
      return {
        name: task.name,
        subnames: subnamess
      };
    }).filter(text => text);
    console.log('filter', filterArray);
    this.layerControllerService.setItemsFilter({filter: filterArray});
  }

}
