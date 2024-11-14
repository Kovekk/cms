import { EventEmitter, Injectable } from '@angular/core';
import { Document } from '../document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documents: Document[] = [];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;


  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    console.log('Working before the call.')
    this.http.get<Document[]>(
      'https://cms-project-firebase-default-rtdb.firebaseio.com/documents.json'
    ).subscribe(
      (documents: Document[]) => {
        console.log('it worked here');
        this.documents = documents;
        this.maxDocumentId = this.getMaxId();
        this.documents.sort(
          (a: Document, b: Document): number => {
            if (a.name < b.name) {return -1}
            else if (a.name > b.name) {return 1}
            else {return 0};
          }
        );
        const clone = this.documents.slice();
        this.documentListChangedEvent.next(clone);
      },
      (error: any) => {
        console.log(error);
      }
    )

    // OLD METHOD
    // return this.documents.slice();
  }

  getDocument(id: string): Document | null {
    for (let i = 0; i < this.documents.length; i++) {
      if (this.documents[i].id == id) {
        return this.documents[i];
      }
    }
    return null;
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
    // OLD CODE WITH EVENT EMITTERS
    // this.documentChangedEvent.emit(this.documents.slice());
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.documents.length; i++) {
      const document = this.documents[i];
      const currentId = Number(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeDocuments() {
    const documents = JSON.stringify(this.documents);
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put(
      'https://cms-project-firebase-default-rtdb.firebaseio.com/documents.json',
       documents,
      {headers}
    ).subscribe(
      () => {
        const clone = this.documents.slice();
        this.documentListChangedEvent.next(clone);
      }
    )
  }
}
