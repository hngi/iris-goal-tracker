import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';
declare let swal: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  signupForm: FormGroup;
  constructor(private user: UserService, private utils: UtilService) {
    this.signupForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit(userData: any) {
    this.user.register(userData).subscribe(async res => {
      console.log('signup response:', res);
      this.signupForm.reset();
      this.utils.showToast({ title: 'Successfully signed up!', type: 'success' });

      const { value: token } = await swal.fire({
        title: 'Verify your account',
        text: 'Enter the 6-digit code sent to your email address',
        input: 'text',
        showCancelButton: true
      });

      if (token) {
        console.log('token received', token);
        this.user.verify(token).subscribe((user: any) => {
          this.user.saveUser(user.data);
          this.utils.showToast({ title: 'Verification complete!', type: 'success' });
        }, err => {
          console.log('verify error', err);
          this.utils.showToast({ title: err, type: 'error' });
        });
      }
    }, err => {
      console.log('error', err);
      this.utils.showToast({ title: err, type: 'error' });
    });
  }
}
