import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { UtilService } from '../util.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  loading = false;

  constructor(private user: UserService, private utils: UtilService) {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.minLength(4)),
      message: new FormControl('', Validators.minLength(4)),
      email: new FormControl('', Validators.email),
      subject: new FormControl('', Validators.minLength(4))
    });
  }

  ngOnInit() {
  }

  onSubmit(formData: any) {
    this.loading = true;
    this.user.handleContact(formData).subscribe((res: any) => { // res.data is the user object
      this.contactForm.reset();
      this.loading = false;
      this.utils.showToast({ title: 'We\'ve received your message. We\'ll get back to you shortly', type: 'success' });
    }, err => {
      this.loading = false;
      this.utils.showToast({ title: err, type: 'error' });
    });
  }

}
