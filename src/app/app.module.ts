import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
import { CustomErrorHandler } from './shared/error-handler/error-handler';

import { ScrollHorizontalDirective } from './directives/scroll-horizontal/scroll-horizontal.directive';
import { SidebarComponent } from './components/sidebar/sidebar.component';

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
    SidebarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    httpInterceptorProviders,
    { provide: ErrorHandler, useClass: CustomErrorHandler },
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }
