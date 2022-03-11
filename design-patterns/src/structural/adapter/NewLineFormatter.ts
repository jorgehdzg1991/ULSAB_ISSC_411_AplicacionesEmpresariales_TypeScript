import ITextFormattable from './ITextFormattable';

export default class NewLineFormatter implements ITextFormattable {
  public formatText(text: string): string {
    return text.split('.').join('\n');
  }
}
