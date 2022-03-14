import IMessageSender from './IMessageSender';

export default abstract class Message {
  protected messageSender: IMessageSender;

  public constructor(messageSender: IMessageSender) {
    this.messageSender = messageSender;
  }

  public abstract send(): void;
}
