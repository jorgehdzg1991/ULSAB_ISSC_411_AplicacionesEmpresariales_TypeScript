import BasePizzaFactory, { PizzaType } from './BasePizzaFactory';
import CheesePizza from './CheesePizza';
import PepperoniPizza from './PepperoniPizza';
import Pizza from './Pizza';
import VeggiePizza from './VeggiePizza';

export default class PizzaFactory extends BasePizzaFactory {
  public makePizza(type: PizzaType): Pizza {
    let pizza: Pizza;

    switch (type) {
      case 'cheese':
        pizza = new CheesePizza();
        break;
      case 'pepperoni':
        pizza = new PepperoniPizza();
        break;
      case 'veggie':
        pizza = new VeggiePizza();
        break;
      default:
        throw new Error('Invalid type of pizza');
    }

    pizza.addIngredients();
    pizza.bakePizza();

    return pizza;
  }
}
