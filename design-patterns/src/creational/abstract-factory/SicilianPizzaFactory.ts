import BasePizzaFactory, { PizzaType } from './BasePizzaFactory';
import CheesePizza from './products/CheesePizza';
import PepperoniPizza from './products/PepperoniPizza';
import Pizza from './products/Pizza';
import VeggiePizza from './products/VeggiePizza';
import SicilianTopicFactory from './SicilianTopingFactory';

export default class SicilianPizzaFactory extends BasePizzaFactory {
  public createPizza(type: PizzaType): Pizza {
    let pizza: Pizza;
    const toppingFactory = new SicilianTopicFactory();
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
