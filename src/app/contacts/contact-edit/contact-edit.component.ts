import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact/contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(id);
        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.contact.group));
        }
      }
    )
  } 

  onSubmit(form: NgForm) {
    const value = form.value;
      let newContact = new Contact(this.contactService.getMaxId().toString(), value['name'], value['email'], value['phone'], value['imageUrl'], this.groupContacts);
      if (this.editMode == true) {
        this.contactService.updateContact(this.originalContact, newContact) ;
      } else {
        this.contactService.addContact(newContact);
      }
      this.router.navigate(['/contacts']);
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  addContact(event: CdkDragDrop<String[]>) {
    const data = event.item.data;
    const newContact = new Contact(data.id, data.name, data.email, data.phone, data.imageUrl, null);
    this.groupContacts.push(newContact);
  }

  onRemoveItem(index: number) {
    console.log(index);
  }
}
