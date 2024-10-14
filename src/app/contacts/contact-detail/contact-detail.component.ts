import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  // contact: Contact = new Contact(1, "R. Kent Jackson", "jacksonk@byui.edu", "208-496-3771", "../../../assets/img/jacksonk.jpg", null);
  isContact: boolean = true;
  @Input() contact: Contact = new Contact('-1', "", "", "", "", null);
}
