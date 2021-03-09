import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'route-planner';

  onMapReady(event: any): void {
    console.log('Map Ready');
  }
}
