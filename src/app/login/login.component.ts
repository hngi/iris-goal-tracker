import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private user: UserService, private utils: UtilService) {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit() {
  }

  onSubmit(userData: any) {
    this.user.login(userData).subscribe((res: any) => { // res.data is the user object
      this.loginForm.reset();
      console.log(res.data);
      this.user.saveUser(res.data);
      this.utils.showToast({ title: 'Successfully logged in', type: 'success' });
    }, err => {
      console.log('error', err);
      this.utils.showToast({ title: err, type: 'error' });
    });
  }
}
