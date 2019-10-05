import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  token: string;
  loading = false;
  passwordResetForm: FormGroup;


  constructor(private activatedRoute: ActivatedRoute, private user: UserService, private utils: UtilService) {
    this.passwordResetForm = new FormGroup({
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
  }

  ngOnInit() {
    // retrieve the token from the url after user clicked the link in the email
    this.token = this.activatedRoute.snapshot.paramMap.get('token');
    console.log(this.token);
  }

  onSubmit(formData: any) {
    this.loading = true;
    delete formData.confirmPassword;
    if (this.passwordResetForm.controls.password.value === this.passwordResetForm.controls.confirmPassword.value) {
      console.log(formData);
      this.user.forgotPassword(formData).subscribe((res: any) => { // res.data is the user object
        this.passwordResetForm.reset();
        this.loading = false;
        this.user.triggerPasswordResetComplete();
        this.utils.showToast({ title: 'Your password has been reset. You can log in now.', type: 'success' });
      }, err => {
        this.loading = false;
        this.utils.showToast({ title: err, type: 'error' });
      });
    }
  }
}
