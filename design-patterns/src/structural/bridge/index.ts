import EmailMessage from './EmailMessage';
import EmailMessageSender from './EmailMessageSender';
import TextMessage from './TextMessage';
import TextMessageSender from './TextMessageSender';

const textMessageSender = new TextMessageSender();
const textMessage = new TextMessage(textMessageSender);
textMessage.send();

const emailMessageSender = new EmailMessageSender();
const emailMessage = new EmailMessage(emailMessageSender);
emailMessage.send();
