import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm: FormGroup;
  loading = false;

  constructor(private user: UserService, private utils: UtilService) {
    this.emailForm = new FormGroup({
      email: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit(formData: any) {
    this.loading = true;
    this.user.forgotPassword(formData).subscribe((res: any) => { // res.data is the user object
      this.emailForm.reset();
      this.loading = false;
      this.utils.showToast({ title: 'A password reset email has been sent to your email address', type: 'success' });
    }, err => {
      this.loading = false;
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

}
