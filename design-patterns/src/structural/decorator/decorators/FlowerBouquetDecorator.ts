import FlowerBouquet from '../components/FlowerBouquet';

export default abstract class FlowerBouquetDecorator extends FlowerBouquet {
  public abstract getDescription(): string;
}
