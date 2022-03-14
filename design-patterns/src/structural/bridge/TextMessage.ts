import Message from './Message';

export default class TextMessage extends Message {
  public send(): void {
    this.messageSender.sendMessage();
  }
}
