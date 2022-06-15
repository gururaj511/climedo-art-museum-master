import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselViewComponent } from './carousel-view/carousel-view.component';
import { ArtOverviewComponent } from './art-overview/art-overview.component';
import {AppRoutingModule} from "./app-routing.module";
import {ArtMuseumService} from "./services/art-museum.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {ModalModule} from "ngb-modal";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    CarouselViewComponent,
    ArtOverviewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule,
    NgbModule,
    BrowserAnimationsModule,
    MatCardModule,
    ScrollingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [ArtMuseumService],
  bootstrap: [AppComponent]
})
export class AppModule { }
