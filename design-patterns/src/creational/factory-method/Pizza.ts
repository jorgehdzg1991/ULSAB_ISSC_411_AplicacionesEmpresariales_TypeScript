export default abstract class Pizza {
  public abstract addIngredients(): void;

  public abstract eat(): void;

  public bakePizza(): void {
    console.log('Pizza baked at 400 for 20 minutes.');
  }
}
