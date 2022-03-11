import Pizza from './products/Pizza';

export type PizzaType = 'cheese' | 'pepperoni' | 'veggie';

export default abstract class BasePizzaFactory {
  public abstract createPizza(type: PizzaType): Pizza;
}
