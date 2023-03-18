import { Component } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showComponent: boolean = true;
  constructor(router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url === '/cars/car/:carId') {
          this.showComponent = false
        }
      }
    });
  }
  title = 'recap';
}
