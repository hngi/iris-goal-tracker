import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;

  constructor() {
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

  }

}
