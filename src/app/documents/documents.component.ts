import { Component } from '@angular/core';
import { Document } from './document.model';
import { DocumentService } from './document/document.service';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
  providers: [DocumentService]
})
export class DocumentsComponent {
  selectedDocument: Document;

  constructor(private documentService: DocumentService) {}

  ngOnInit () {
    this.documentService.documentSelectedEvent.subscribe(
      (document: Document) => this.selectedDocument = document
    )
  }
}
