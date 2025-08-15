import {
  Component,
  inject,
  OnInit,
  signal,
  ViewChild
} from '@angular/core';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  DomSanitizer,
  SafeResourceUrl
} from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EmailService } from '../../services/email-service';
import { AlertToasts } from '../toasts/alert-toasts/alert-toasts';
import { AcceptToasts } from '../toasts/accept-toasts/accept-toasts';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    TranslateModule,
    AcceptToasts,
    AlertToasts
],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {

  address = signal('https://maps.google.com/?q=123+Popular+St,+Tbilisi,+Georgia');
  phone = signal('+995599123456789');
  email = signal('support@tkshop.com');

  // map Url
  mapUrl = signal<SafeResourceUrl | null>(null);

  // Injecting services
  private sanitizer = inject(DomSanitizer);
  private emailService = inject(EmailService);

  // ViewChilds
  @ViewChild('acceptToast') acceptToast!: AcceptToasts;
  @ViewChild('alertToast') alertToast!: AlertToasts;


  // constructor
  constructor() {
    const rawUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d174502.75368507477!2d44.76021740605285!3d41.71802463422026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40440cd7e64f626b%3A0x61d084ede2576ea3!2sTbilisi!5e1!3m2!1sen!2sge!4v1741282248376!5m2!1sen!2sge';
    this.mapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl));
  }


  // form group
  myForm = new FormGroup({
    from_name: new FormControl('', Validators.required),
    user_email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', Validators.required)
  });


  // send message
  sendEmail() {
    if (this.myForm.valid) {

      this.emailService.sendEmail(this.myForm.value).then(

        response => {
          console.log(response.status);
          this.acceptToast.openToast(`Email has been successfully sent!`);

          this.myForm.reset();
          this.myForm.markAsPristine();
          this.myForm.markAsUntouched();
          this.myForm.updateValueAndValidity();
        },
        error => {
          this.alertToast.openToast(`${error} Error while sending the email!`);
        }

      );

    } else {
      this.alertToast.openToast('Please fill out all fields correctly.');
    }
  }

}
