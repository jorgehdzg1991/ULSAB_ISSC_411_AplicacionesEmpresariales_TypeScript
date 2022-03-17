export default abstract class FlowerBouquet {
  protected description?: string;

  public getDescription(): string {
    return <string>this.description;
  }

  public abstract getCost(): number;
}
