import BaseToppingFactory from '../BaseToppingFactory';

export default abstract class Pizza {
  protected toppingFactory: BaseToppingFactory;

  public constructor(toppingFactory: BaseToppingFactory) {
    this.toppingFactory = toppingFactory;
  }

  public abstract addIngredients(): void;

  public abstract eat(): void;

  // eslint-disable-next-line class-methods-use-this
  public bakePizza(): void {
    console.log('Pizza baked at 400 for 20 minutes');
  }
}
