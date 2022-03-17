import FlowerBouquet from '../components/FlowerBouquet';
import FlowerBouquetDecorator from './FlowerBouquetDecorator';

export default class FlowerBouquetWithPaperWrapper extends FlowerBouquetDecorator {
  private flowerBouquet: FlowerBouquet;

  public constructor(flowerBouquet: FlowerBouquet) {
    super();
    this.flowerBouquet = flowerBouquet;
  }

  public getDescription(): string {
    return `${this.flowerBouquet.getDescription()}, paper wrapper`;
  }

  public getCost(): number {
    return 3 + this.flowerBouquet.getCost();
  }
}
