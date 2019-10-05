import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';
import { Router } from '@angular/router';
declare let swal: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;

  constructor(private user: UserService, private utils: UtilService, private router: Router) {
    this.signupForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit(userData: any) {
    this.loading = true;
    this.user.register(userData).subscribe(async res => {
      this.signupForm.reset();
      this.utils.showToast({ title: 'Successfully signed up!', type: 'success' });

      const { value: token } = await swal.fire({
        title: 'A verification code has been sent to your email.',
        text: 'Enter the 6-digit code here',
        input: 'text',
        showCancelButton: true
      });

      if (token) {
        this.user.verify(token).subscribe((user: any) => {
          this.loading = false;
          this.user.saveUser(user.data, true);
          this.utils.showToast({ title: 'Verification complete! You\'re logged in.', type: 'success' });
        }, err => {
          this.loading = false;
          this.utils.showToast({ title: err, type: 'error' });
        });
      }
      this.loading = false;
    }, err => {
      this.loading = false;
      this.utils.showToast({ title: err, type: 'error' });
    });
  }
}
