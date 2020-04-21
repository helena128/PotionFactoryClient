import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {SearchBooksComponent} from "./search-books/search-books.component";
import {IngredientsRequestComponent} from "./ingredients-request/ingredients-request.component";
import {ManufactureReportComponent} from "./manufacture-report/manufacture-report.component";


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
        path: 'ingredients', component: IngredientsRequestComponent
      },
      {
        path: 'report', component: ManufactureReportComponent
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
