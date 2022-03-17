export default class Product {
  public productId: number;

  public name?: string;

  public constructor(productId: number, name?: string) {
    this.productId = productId;
    this.name = name;
  }
}
