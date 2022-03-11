import Cheese from './toppings/Cheese';
import Sauce from './toppings/Sauce';

export default abstract class BaseToppingFactory {
  public abstract createCheese(): Cheese;

  public abstract createSauce(): Sauce;
}
