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
import { IngredientsRequestComponent } from './ingredients-request/ingredients-request.component';
import { ManufactureReportComponent } from './manufacture-report/manufacture-report.component';
import { CommonDetailsComponent } from './common-details/common-details.component';
import { IngredientDetailsComponent } from './ingredient-details/ingredient-details.component';
import { BookContentComponent } from './book-content/book-content.component';

import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgbTypeaheadModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    MainNavbarComponent,
    MainPageComponent,
    MainFooterComponent,
    ProductListComponent,
    ProductDetailsComponent,
    SearchBooksComponent,
    IngredientsRequestComponent,
    ManufactureReportComponent,
    CommonDetailsComponent,
    IngredientDetailsComponent,
    BookContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbTypeaheadModule
  ],
  // exports: [
  //   GraphQLModule
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
