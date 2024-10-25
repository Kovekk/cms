import { Component } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document/document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrl: './document-detail.component.css'
})
export class DocumentDetailComponent {
  document: Document;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private windowRefService: WindRefService
  ) {
    this.nativeWindow = windowRefService.getNativeWindow();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        const id = params['id'];
        this.document = this.documentService.getDocument(id);
      }
    )
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url);
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents'], {relativeTo: this.activatedRoute});
  }
}
