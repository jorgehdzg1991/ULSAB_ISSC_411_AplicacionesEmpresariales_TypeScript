export default abstract class CatalogComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public add(catalogComponent: CatalogComponent): void {
    throw new Error('Not supported.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public remove(catalogComponent: CatalogComponent): void {
    throw new Error('Not supported.');
  }

  public getName(): string {
    throw new Error('Not supported.');
  }

  public getPrice(): number {
    throw new Error('Not supported.');
  }

  public print(): void {
    throw new Error('Not supported.');
  }
}
