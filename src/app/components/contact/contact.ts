import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { EmailService } from '../../services/email-service';
import { AlertToasts } from '../toasts/alert-toasts/alert-toasts';
import { AcceptToasts } from '../toasts/accept-toasts/accept-toasts';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts
],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact implements OnInit {

  ngOnInit(): void {}

  mapUrl: SafeResourceUrl;

  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;

  constructor(private sanitizer: DomSanitizer, private emailService: EmailService) {
    this.mapUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174502.75368507477!2d44.76021740605285!3d41.71802463422026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61d084ede2576ea3!2sTbilisi!5e1!3m2!1sen!2sge!4v1741282248376!5m2!1sen!2sge'
    );
  }


  myForm = new FormGroup({
    from_name: new FormControl('', Validators.required),
    user_email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });

  sendEmail() {
    if (this.myForm.valid) {
      this.emailService.sendEmail(this.myForm.value).then(
        response => {
          console.log('Email has been successfully sent!', response);
          this.acceptToast.openToast();

          this.myForm.reset();
          this.myForm.markAsPristine();
          this.myForm.markAsUntouched();
          this.myForm.updateValueAndValidity();
        },
        error => {
          console.error('Error while sending the email!', error);
          this.alertToast.openToast();
        }
      );
    } else {
      console.log('Please fill out all fields correctly.');
      this.alertToast.openToast();
    }
  }

}