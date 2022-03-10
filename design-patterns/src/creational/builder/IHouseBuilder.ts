import House from './House';

export default interface IHouseBuilder {
  buildFoundation(): void;
  buildStructure(): void;
  buildRoof(): void;
  paintHouse(): void;
  furnishHouse(): void;
  getHouse(): House;
}
