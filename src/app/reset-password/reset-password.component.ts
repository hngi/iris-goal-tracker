import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    // retrieve the token from the url after user clicked the link in the email
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

}
