import { EventEmitter, Injectable } from '@angular/core';
import { Message } from '../message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  messageChangedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    this.http.get<Message[]>(
      'https://cms-project-firebase-default-rtdb.firebaseio.com/messages.json'
    ).subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        const clone = this.messages.slice();
        this.messageChangedEvent.emit(clone);
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  getMessage(id: string): Message | null {
    for (let i = 0; i < this.messages.length; i++) {
      if (this.messages[i].id = id) {
        return this.messages[i];
      }
    }
    return null;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }

  getMaxId(): number {
    let maxId = 0;
    for (let i = 0; i < this.messages.length; i++) {
      const message = this.messages[i];
      const currentId = Number(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    this.http.put(
      'https://cms-project-firebase-default-rtdb.firebaseio.com/messages.json',
       messages,
      {headers}
    ).subscribe(
      () => {
        const clone = this.messages.slice();
        this.messageChangedEvent.emit(clone);
      }
    )
  }
}
