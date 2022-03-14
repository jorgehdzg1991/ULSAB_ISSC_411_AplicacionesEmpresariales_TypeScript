import Message from './Message';

export default class EmailMessage extends Message {
  public send(): void {
    this.messageSender.sendMessage();
  }
}
