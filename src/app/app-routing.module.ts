import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {SearchBooksComponent} from "./search-books/search-books.component";
import {IngredientsRequestComponent} from "./ingredients-request/ingredients-request.component";
import {ManufactureReportComponent} from "./manufacture-report/manufacture-report.component";
import {IngredientDetailsComponent} from "./ingredient-details/ingredient-details.component";
import {BookContentComponent} from "./book-content/book-content.component";
import {LoginFormComponent} from "./login-form/login-form.component";


const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'products', component: ProductListComponent
      },
      {
        path: 'products/:id', component: ProductDetailsComponent
      },
      {
        path: 'books', component: SearchBooksComponent
      },
      {
        path: 'books/:id', component: BookContentComponent
      },
      {
        path: 'ingredients', component: IngredientsRequestComponent
      },
      {
        path: 'ingredients/:id', component: IngredientDetailsComponent
      },
      {
        path: 'report', component: ManufactureReportComponent
      }
    ]
  },
  {
        path: 'login', component: LoginFormComponent
  },
  {
    path: '**',
    // redirectTo: ''
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
