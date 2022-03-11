import ICsvFormattable from './ICsvFormattable';
import ITextFormattable from './ITextFormattable';

export default class CsvAdapterImpl implements ITextFormattable {
  private csvFormatter: ICsvFormattable;

  public constructor(csvFormatter: ICsvFormattable) {
    this.csvFormatter = csvFormatter;
  }

  public formatText(text: string): string {
    return this.csvFormatter.formatCsvText(text);
  }
}
