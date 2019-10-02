import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(private user: UserService, private utils: UtilService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  onSubmit(userData: any) {
    this.loading = true;
    this.user.login(userData).subscribe((res: any) => { // res.data is the user object
      this.loginForm.reset();
      this.user.saveUser(res.data, true);
      this.loading = false;
      this.utils.showToast({ title: 'Successfully logged in', type: 'success' });
    }, err => {
      this.loading = false;
      this.utils.showToast({ title: err, type: 'error' });
    });
  }
}
