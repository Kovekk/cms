import { Component } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact/contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  providers: [ContactService]
})
export class ContactsComponent {
  selectedContact: Contact|null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.contactSelectedEvent.subscribe(
      (contact: Contact) => this.selectedContact = contact
    );
  }
}
