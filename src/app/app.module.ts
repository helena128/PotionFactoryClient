import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainNavbarComponent} from './main-navbar/main-navbar.component';
import {MainPageComponent} from './main-page/main-page.component';
import {MainFooterComponent} from './main-footer/main-footer.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductDetailsComponent} from './product-details/product-details.component';
import { SearchBooksComponent } from './search-books/search-books.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainPageComponent,
    MainFooterComponent,
    ProductListComponent,
    ProductDetailsComponent,
    SearchBooksComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
