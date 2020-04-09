import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MainNavbarComponent } from './main-navbar/main-navbar.component';
import { UserListComponent } from './user-list/user-list.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { IngridientsRequestComponent } from './ingridients-request/ingridients-request.component';
import { AcceptRequestComponent } from './accept-request/accept-request.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    UserProfileComponent,
    MainNavbarComponent,
    UserListComponent,
    LoginScreenComponent,
    ProductListComponent,
    OrderHistoryComponent,
    ProductInfoComponent,
    IngridientsRequestComponent,
    AcceptRequestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
