import House from './House';
import IHouseBuilder from './IHouseBuilder';

export default class PrefabricatedHouseBuilder implements IHouseBuilder {
  private house: House;

  public constructor() {
    this.house = new House();
  }

  public buildFoundation(): void {
    this.house.setFoundation('Wood, laminate and PVC flooring');
    console.log('PrefabricatedHouseBuilder: Foundation complete.');
  }

  public buildStructure(): void {
    this.house.setStructure('Structural steels and wooden wall panels');
    console.log('PrefabricatedHouseBuilder: Structure complete.');
  }

  public buildRoof(): void {
    this.house.setRoof('Roofing sheets');
    console.log('PrefabricatedHouseBuilder: Roof complete.');
  }

  public paintHouse(): void {
    this.house.setPainted(true);
    console.log('PrefabricatedHouseBuilder: Painting complete.');
  }

  public furnishHouse(): void {
    this.house.setFurnished(true);
    console.log('PrefabricatedHouseBuilder: Furnishing complete.');
  }

  public getHouse(): House {
    console.log('PrefabricatedHouseBuilder: Prefabricated house complete.');
    return this.house;
  }
}
