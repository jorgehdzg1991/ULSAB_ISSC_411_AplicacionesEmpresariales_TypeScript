import House from './House';
import IHouseBuilder from './IHouseBuilder';

export default class ConstructionEngineer {
  private houseBuilder: IHouseBuilder;

  public constructor(houseBuilder: IHouseBuilder) {
    this.houseBuilder = houseBuilder;
  }

  public buildHouse(): House {
    this.houseBuilder.buildFoundation();
    this.houseBuilder.buildStructure();
    this.houseBuilder.buildRoof();
    this.houseBuilder.paintHouse();
    this.houseBuilder.furnishHouse();

    return this.houseBuilder.getHouse();
  }
}
