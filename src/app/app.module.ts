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
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { LoginFormComponent } from './login-form/login-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { IngredientsListComponentComponent } from './ingredients-list-component/ingredients-list-component.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { ReportListComponent } from './report-list/report-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';
import { OrderListComponent } from './order-list/order-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

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
    BookContentComponent,
    LoginFormComponent,
    EditProfileComponent,
    UserListComponent,
    IngredientsListComponentComponent,
    ReportListComponent,
    RecipeDetailsComponent,
    RecipeListComponent,
    RecipeFormComponent,
    OrderListComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbTypeaheadModule,
    BrowserAnimationsModule, // required animations module
    MatExpansionModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  // exports: [
  //   GraphQLModule
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
