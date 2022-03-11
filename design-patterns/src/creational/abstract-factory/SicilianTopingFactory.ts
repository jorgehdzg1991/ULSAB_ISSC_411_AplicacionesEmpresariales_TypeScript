import BaseToppingFactory from './BaseToppingFactory';
import Cheese from './toppings/Cheese';
import MozzarellaCheese from './toppings/MozzarellaCheese';
import Sauce from './toppings/Sauce';
import TomatoSauce from './toppings/TomatoSauce';

export default class SicilianTopicFactory extends BaseToppingFactory {
  // eslint-disable-next-line class-methods-use-this
  public createCheese(): Cheese {
    return new MozzarellaCheese();
  }

  // eslint-disable-next-line class-methods-use-this
  public createSauce(): Sauce {
    return new TomatoSauce();
  }
}
