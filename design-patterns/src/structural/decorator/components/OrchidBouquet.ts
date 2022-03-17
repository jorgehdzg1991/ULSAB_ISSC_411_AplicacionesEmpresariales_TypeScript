import FlowerBouquet from './FlowerBouquet';

export default class OrchidBouquet extends FlowerBouquet {
  public constructor() {
    super();
    this.description = 'Orchid bouquet';
  }

  public getCost(): number {
    return 29;
  }
}
