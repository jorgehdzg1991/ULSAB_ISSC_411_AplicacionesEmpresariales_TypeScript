export default abstract class Sauce {
  public constructor() {
    this.prepareSauce();
  }

  public abstract prepareSauce(): void;
}
