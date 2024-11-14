import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.toLowerCase().includes(term)) {
        filteredContacts.push(contacts[i]);
      }
    }
    if (filteredContacts.length < 1) {
      return contacts;
    }
    return filteredContacts;
  }

}
