import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {SearchBooksComponent} from "./search-books/search-books.component";
import {IngredientsRequestComponent} from "./ingredients-request/ingredients-request.component";
import {ManufactureReportComponent} from "./manufacture-report/manufacture-report.component";
import {IngredientDetailsComponent} from "./ingredient-details/ingredient-details.component";
import {BookContentComponent} from "./book-content/book-content.component";
import {LoginFormComponent} from "./login-form/login-form.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {UserListComponent} from "./user-list/user-list.component";
import {IngredientsListComponentComponent} from "./ingredients-list-component/ingredients-list-component.component";
import {ReportListComponent} from "./report-list/report-list.component";
import {RecipeDetailsComponent} from "./recipe-details/recipe-details.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {RecipeFormComponent} from "./recipe-form/recipe-form.component";
import {OrderListComponent} from "./order-list/order-list.component";
import {NotFoundComponent} from "./not-found/not-found.component";


const routes: Routes = [
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
    path: 'ingredients/request', component: IngredientsRequestComponent
  },
  {
    path: 'ingredients', component: IngredientsListComponentComponent
  },
  {
    path: 'ingredients/:id', component: IngredientDetailsComponent
  },
  {
    path: 'report', component: ManufactureReportComponent
  },
  {
    path: 'users/:id', component: EditProfileComponent
  },
  {
    path: 'users', component: UserListComponent
  },
  {
    path: 'transfer', component: ReportListComponent
  },
  {
    path: 'recipes/new', component: RecipeFormComponent, pathMatch: 'full'
  },
  {
    path: 'recipes/:id', component: RecipeDetailsComponent
  },
  {
    path: 'recipes', component: RecipeListComponent
  },
  {
    path: 'settings', component: EditProfileComponent
  },
  {
    path: 'register', component: EditProfileComponent
  },
  {
    path: 'orders', component: OrderListComponent, runGuardsAndResolvers: 'always'
  },
  {
    path: 'not-found', component: NotFoundComponent
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
export class AppRoutingModule {
}
