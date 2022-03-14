import IMessageSender from './IMessageSender';

export default class EmailMessageSender implements IMessageSender {
  sendMessage(): void {
    console.log('EmailMessageSender: Sending email message.');
  }
}
