import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sign = 'login';
  tour = 'overview';
  token: string;

  constructor(private route: ActivatedRoute, private user: UserService) { }

  ngOnInit() {
    this.user.getPasswordResetStatus().subscribe(status => {
      if (status) {
        this.sign = 'login';
      }
    });

    this.token = this.route.snapshot.paramMap.get('token');
    console.log('token at home: ', this.token);
    if (this.token) {
      this.sign = 'reset';
    }
  }

}
