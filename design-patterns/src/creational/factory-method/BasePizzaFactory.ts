import Pizza from './Pizza';

export type PizzaType = 'cheese' | 'pepperoni' | 'veggie';

export default abstract class BasePizzaFactory {
  // eslint-disable-next-line no-unused-vars
  public abstract makePizza(type: PizzaType): Pizza;
}
