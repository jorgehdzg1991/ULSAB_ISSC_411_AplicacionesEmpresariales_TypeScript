import BaseToppingFactory from './BaseToppingFactory';
import CaliforniaOilSauce from './toppings/CaliforniaOilSauce';
import Cheese from './toppings/Cheese';
import GoatCheese from './toppings/GoatCheese';
import Sauce from './toppings/Sauce';

export default class GourmetToppingFactory extends BaseToppingFactory {
  // eslint-disable-next-line class-methods-use-this
  public createCheese(): Cheese {
    return new GoatCheese();
  }

  // eslint-disable-next-line class-methods-use-this
  public createSauce(): Sauce {
    return new CaliforniaOilSauce();
  }
}
