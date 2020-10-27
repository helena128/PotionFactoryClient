import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'potions-factory';

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('userRole');
  }
}
