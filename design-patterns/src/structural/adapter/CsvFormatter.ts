import ICsvFormattable from './ICsvFormattable';

export default class CsvFormatter implements ICsvFormattable {
  formatCsvText(text: string): string {
    return text.split('.').join(',');
  }
}
