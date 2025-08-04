import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class Contact {

  contact = {
    name: '',
    email: '',
    message: ''
  };

  submitContactForm() {
    if (!this.contact.name || !this.contact.email || !this.contact.message) {
      alert('Please fill in all fields.');
      return;
    }
    alert(`Message sent! Thank you, ${this.contact.name}.`);
    this.contact = { name: '', email: '', message: '' };
  }

}