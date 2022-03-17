import FlowerBouquet from '../components/FlowerBouquet';
import FlowerBouquetDecorator from './FlowerBouquetDecorator';

export default class FlowerBouquetWithGlitter extends FlowerBouquetDecorator {
  private flowerBouquet: FlowerBouquet;

  public constructor(flowerBouquet: FlowerBouquet) {
    super();
    this.flowerBouquet = flowerBouquet;
  }

  public getDescription(): string {
    return `${this.flowerBouquet.getDescription()}, glitter`;
  }

  public getCost(): number {
    return 4 + this.flowerBouquet.getCost();
  }
}
