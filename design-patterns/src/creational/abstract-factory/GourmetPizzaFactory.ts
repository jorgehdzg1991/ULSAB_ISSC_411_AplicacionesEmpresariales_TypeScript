import BasePizzaFactory, { PizzaType } from './BasePizzaFactory';
import GourmetToppingFactory from './GourmetToppingFactory';
import CheesePizza from './products/CheesePizza';
import PepperoniPizza from './products/PepperoniPizza';
import Pizza from './products/Pizza';
import VeggiePizza from './products/VeggiePizza';

export default class GourmetPizzaFactory extends BasePizzaFactory {
  // eslint-disable-next-line class-methods-use-this
  public createPizza(type: PizzaType): Pizza {
    let pizza: Pizza;
    const toppingFactory = new GourmetToppingFactory();
    switch (type.toLowerCase()) {
      case 'cheese':
        pizza = new CheesePizza(toppingFactory);
        break;
      case 'pepperoni':
        pizza = new PepperoniPizza(toppingFactory);
        break;
      case 'veggie':
        pizza = new VeggiePizza(toppingFactory);
        break;
      default:
        throw new Error('No such pizza.');
    }
    pizza.addIngredients();
    pizza.bakePizza();
    return pizza;
  }
}
