import { Component, Input } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent {
  @Input() message: Message;
  messageSender: string;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    // console.log(this.contactService.getContacts());
    const contact: Contact = this.contactService.getContact(this.message.sender);
    this.messageSender = contact.name;
  }
}
