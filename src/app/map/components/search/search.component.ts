import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  from: string;

  to: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
