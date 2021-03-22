import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OlMapComponent } from './map/ol-map/ol-map.component';
import {SideMenuComponent} from './map/components/side-menu/side-menu.component';
import { OverlayBoxComponent } from './map/components/overlay-box/overlay-box.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { SearchComponent } from './map/components/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    OlMapComponent,
    SideMenuComponent,
    OverlayBoxComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonToggleModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
