import IMessageSender from './IMessageSender';

export default class TextMessageSender implements IMessageSender {
  sendMessage(): void {
    console.log('TextMessageSender: Sending text message.');
  }
}
