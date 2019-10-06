import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';

declare const quoteGenerator: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private user: UserService, private router: Router, private route: Router) {
    // console.log(route);
    // this.route.fragment.subscribe(console.log);
    this.user.getLoggedInStatus().subscribe(isLoggedIn => {
      if (isLoggedIn) {
        // this.router.navigate(['/dashboard']);
      } else {
        // this.router.navigate(['/']);
      }
    });
  }

  onload() {
    quoteGenerator();
  }
}
