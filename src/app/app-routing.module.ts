import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainPageComponent} from "./main-page/main-page.component";
import {ProductListComponent} from "./product-list/product-list.component";


const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent,
    children: [
      {
        path: 'products', component: ProductListComponent
      }
    ]
  },
  {
    path: '**', redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
