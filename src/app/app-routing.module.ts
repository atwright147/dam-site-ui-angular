import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmstripComponent } from './components/layout/filmstrip/filmstrip.component';
import { GridComponent } from './components/layout/grid/grid.component';

const routes: Routes = [
  { path: 'layout/filmstrip', component: FilmstripComponent },
  { path: 'layout/grid', component: GridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
