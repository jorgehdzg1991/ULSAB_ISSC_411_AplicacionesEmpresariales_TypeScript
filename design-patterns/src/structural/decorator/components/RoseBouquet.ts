import FlowerBouquet from './FlowerBouquet';

export default class RoseBouquet extends FlowerBouquet {
  public constructor() {
    super();
    this.description = 'Rose bouquet';
  }

  public getCost(): number {
    return 12;
  }
}
