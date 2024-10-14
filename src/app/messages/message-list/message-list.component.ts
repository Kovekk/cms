import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, "Help for math", "What is 1 + 1ish?", "Fredrick"),
    new Message(1, "RE: Help for math", "the answer is nearly 2. 1ish makes all answers nearly answers", "Professor"),
    new Message(1, "This is the greatest class", "I love learning about all the ish's and nearly's. Thanks for the help", "Fredrick")
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
