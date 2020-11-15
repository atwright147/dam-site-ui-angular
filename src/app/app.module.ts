import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TreeModule } from 'angular-tree-component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmstripComponent } from './components/layout/filmstrip/filmstrip.component';
import { ThumbnailComponent } from './components/thumbnail/thumbnail.component';
import { PreviewComponent } from './components/preview/preview.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { GridComponent } from './components/layout/grid/grid.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

import { httpInterceptorProviders } from './http-interceptors';
import { ScrollHorizontalDirective } from './directives/scroll-horizontal/scroll-horizontal.directive';

@NgModule({
  declarations: [
    AppComponent,
    FilmstripComponent,
    ThumbnailComponent,
    PreviewComponent,
    HeaderComponent,
    FooterComponent,
    GridComponent,
    ScrollHorizontalDirective,
    SpinnerComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TreeModule.forRoot(),
  ],
  providers: [
    httpInterceptorProviders,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
