import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subject') subject: ElementRef;
  @ViewChild('msgText') msgText: ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  currentSender: string = "Robert Lowry"

  onSendMessage(event: MouseEvent) {
    event.preventDefault();
    let subject = this.subject.nativeElement.value;
    let msgText = this.msgText.nativeElement.value;
    let message = new Message(1, subject, msgText, this.currentSender);
    this.addMessageEvent.emit(message);
  }

  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
