import ConcreteHouseBuilder from './ConcreteHouseBuilder';
import ConstructionEngineer from './ConstructionEngineer';
import PrefabricatedHouseBuilder from './PrefabricatedHouseBuilder';

const concreteHouseBuilder = new ConcreteHouseBuilder();
const engineerA = new ConstructionEngineer(concreteHouseBuilder);
const houseA = engineerA.buildHouse();

houseA.describeHouse();

const prefabricatedHouseBuilder = new PrefabricatedHouseBuilder();
const engineerB = new ConstructionEngineer(prefabricatedHouseBuilder);
const houseB = engineerB.buildHouse();

houseB.describeHouse();
