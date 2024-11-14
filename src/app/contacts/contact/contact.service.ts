import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from '../contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();
  contactListChangedEvent = new Subject<Contact[]>();
  maxContactId: number;

  constructor(private http: HttpClient) {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
  }

  getContacts() {
    this.http.get<Contact[]>(
      'https://cms-project-firebase-default-rtdb.firebaseio.com/contacts.json'
    ).subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
        this.maxContactId = this.getMaxId();
        this.contacts.sort(
          (a: Contact, b: Contact): number => {
            if (a.name < b.name) {return -1}
            else if (a.name > b.name) {return 1}
            else {return 0};
          }
        );
        const clone = this.contacts.slice();
        this.contactListChangedEvent.next(clone);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getContact(id: string): Contact | null {
    for (let i = 0; i < this.contacts.length; i++) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
    return null;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.storeContacts();
    // OLD CODE WITH EVENT EMITTERS
    // this.contactChangedEvent.emit(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    this.maxContactId++;
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact);
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.storeContacts();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.contacts.length; i++) {
      const contact = this.contacts[i];
      const currentId = Number(contact.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeContacts() {
    const contacts = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put(
      'https://cms-project-firebase-default-rtdb.firebaseio.com/contacts.json',
       contacts,
      {headers}
    ).subscribe(
      () => {
        const clone = this.contacts.slice();
        this.contactListChangedEvent.next(clone);
      }
    )
  }
}
