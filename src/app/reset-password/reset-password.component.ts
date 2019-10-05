import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  loading = false;
  passwordResetForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute) {
    this.passwordResetForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  ngOnInit() {
    // retrieve the token from the url after user clicked the link in the email
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
  }

  onSubmit(formData: any) {
    if (this.passwordResetForm.controls.password.value === this.passwordResetForm.controls.confirmPassword.value) {
      console.log(formData);
    }
  }
}
