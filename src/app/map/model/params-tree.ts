import {ThemePalette} from '@angular/material/core';

export class ParamsTree {
  name: string;
  completed: boolean;
  count: number;
  paramsTree?: ParamsTree[];

  constructor(name, completed, count, paramsTree) {
    this.name = name;
    this.completed = completed;
    this.count = count;
    this.paramsTree = paramsTree;
  }
}
