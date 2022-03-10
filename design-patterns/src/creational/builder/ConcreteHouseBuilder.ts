import House from './House';
import IHouseBuilder from './IHouseBuilder';

export default class ConcreteHouseBuilder implements IHouseBuilder {
  private house: House;

  public constructor() {
    this.house = new House();
  }

  public buildFoundation(): void {
    this.house.setFoundation('Concrete, brick and stone');
    console.log('ConcreteHouseBuilder: Foundation complete.');
  }

  public buildStructure(): void {
    this.house.setStructure('Concrete, mortar, brick and reinforced steel');
    console.log('ConcreteHouseBuilder: Structure complete.');
  }

  public buildRoof(): void {
    this.house.setRoof('Concrete and reinforced steel');
    console.log('ConcreteHouseBuilder: Roof complete.');
  }

  public paintHouse(): void {
    this.house.setPainted(true);
    console.log('ConcreteHouseBuilder: Painting complete.');
  }

  public furnishHouse(): void {
    this.house.setFurnished(true);
    console.log('ConcreteHouseBuilder: Furnishing complete.');
  }

  public getHouse(): House {
    console.log('ConcreteHouseBuilder: Concrete house complete.');
    return this.house;
  }
}
