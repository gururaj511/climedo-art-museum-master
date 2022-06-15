import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ArtOverviewComponent} from "./art-overview/art-overview.component";

const routes: Routes = [
  {
    path: '',
    pathMatch:'full',
    component: ArtOverviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
