import FlowerBouquet from '../components/FlowerBouquet';
import FlowerBouquetDecorator from './FlowerBouquetDecorator';

export default class FlowerBouquetWithRibbonBow extends FlowerBouquetDecorator {
  private flowerBouquet: FlowerBouquet;

  public constructor(flowerBouquet: FlowerBouquet) {
    super();
    this.flowerBouquet = flowerBouquet;
  }

  public getDescription(): string {
    return `${this.flowerBouquet.getDescription()}, ribbon bow`;
  }

  public getCost(): number {
    return 6.5 + this.flowerBouquet.getCost();
  }
}
