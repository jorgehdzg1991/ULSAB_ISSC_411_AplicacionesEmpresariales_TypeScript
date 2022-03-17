import BaseToppingFactory from './BaseToppingFactory';
import Cheese from './toppings/Cheese';
import MozzarellaCheese from './toppings/MozzarellaCheese';
import Sauce from './toppings/Sauce';
import TomatoSauce from './toppings/TomatoSauce';

export default class SicilianToppingFactory extends BaseToppingFactory {
  public createCheese(): Cheese {
    return new MozzarellaCheese();
  }

  public createSauce(): Sauce {
    return new TomatoSauce();
  }
}
