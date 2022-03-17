import FlowerBouquetWithGlitter from './decorators/FlowerBouquetWithGlitter';
import OrchidBouquet from './components/OrchidBouquet';
import FlowerBouquetWithPaperWrapper from './decorators/FlowerBouquetWithPaperWrapper';
import FlowerBouquetWithRibbonBow from './decorators/FlowerBouquetWithRibbonBow';
import RoseBouquet from './components/RoseBouquet';

/* Rose bouquet with no decoration */
const roseBouquet = new RoseBouquet();
console.log(`${roseBouquet.getDescription()} $ ${roseBouquet.getCost()}`);

/* Rose bouquet with paper wrapper, ribbon bow, and glitter */
let decoratedRoseBouquet = new RoseBouquet();
decoratedRoseBouquet = new FlowerBouquetWithPaperWrapper(decoratedRoseBouquet);
decoratedRoseBouquet = new FlowerBouquetWithRibbonBow(decoratedRoseBouquet);
decoratedRoseBouquet = new FlowerBouquetWithGlitter(decoratedRoseBouquet);
console.log(
  `${decoratedRoseBouquet.getDescription()} $ ${decoratedRoseBouquet.getCost()}`
);

/* Orchid bouquet with double paper wrapper and ribbon bow */
let decoratedOrchidBouquet = new OrchidBouquet();
decoratedOrchidBouquet = new FlowerBouquetWithPaperWrapper(
  decoratedOrchidBouquet
);
decoratedOrchidBouquet = new FlowerBouquetWithPaperWrapper(
  decoratedOrchidBouquet
);
decoratedOrchidBouquet = new FlowerBouquetWithRibbonBow(decoratedOrchidBouquet);
console.log(
  `${decoratedOrchidBouquet.getDescription()} $ ${decoratedOrchidBouquet.getCost()}`
);
