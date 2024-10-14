import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocument = new EventEmitter<Document>();
  documents: Document[] = [
    new Document(1, 'players but the name is so much longer', 'players in campaign', 'location1', null),
    new Document(1, 'monsters', 'monsters for session 1', 'location2', null),
    new Document(1, 'weapons', 'the players gear', 'location3', null),
    new Document(1, 'ideas', 'empty file where ideas are', 'location4', null)
  ];

  onSelectedDocument(document: Document) {
    this.selectedDocument.emit(document);
  }
}
