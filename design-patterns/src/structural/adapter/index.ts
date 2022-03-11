import CsvAdapterImpl from './CsvAdapterImpl';
import CsvFormatter from './CsvFormatter';
import NewLineFormatter from './NewLineFormatter';

const testString = 'Formatting line 1.Formatting line 2.Formatting line 3';

const newLineFormatter = new NewLineFormatter();
const resultString = newLineFormatter.formatText(testString);

console.log(resultString);

const csvFormatter = new CsvFormatter();
const csvAdapter = new CsvAdapterImpl(csvFormatter);
const resultCsvString = csvAdapter.formatText(testString);

console.log(resultCsvString);
