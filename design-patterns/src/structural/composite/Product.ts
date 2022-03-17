import CatalogComponent from './CatalogComponent';

export default class Product extends CatalogComponent {
  private name: string;

  private price: number;

  public constructor(name: string, price: number) {
    super();
    this.name = name;
    this.price = price;
  }

  public getName(): string {
    return this.name;
  }

  public getPrice(): number {
    return this.price;
  }

  public print(): void {
    console.log(`Product name: ${this.name}; Price: ${this.price};`);
  }
}
