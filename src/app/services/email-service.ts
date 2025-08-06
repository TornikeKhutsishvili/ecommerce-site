import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  private serviceId = 'service_dll4rgd';
  private templateId = 'template_e9pl5q3';
  private userId = 'mSAYX7nTUS5cbyETL';

  sendEmail(formData: any) {
    return emailjs.send(this.serviceId, this.templateId, formData, this.userId);
  }

}
