import CatalogComponent from './CatalogComponent';

export default class ProductCatalog extends CatalogComponent {
  private products: CatalogComponent[];

  private name: string;

  public constructor(name: string) {
    super();
    this.name = name;
    this.products = [];
  }

  public getName(): string {
    return this.name;
  }

  public print(): void {
    // eslint-disable-next-line no-restricted-syntax
    for (const product of this.products) {
      product.print();
    }
  }

  public add(catalogComponent: CatalogComponent): void {
    this.products.push(catalogComponent);
  }

  public remove(catalogComponent: CatalogComponent): void {
    this.products = this.products.filter((c) => c === catalogComponent);
  }
}
