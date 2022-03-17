import Product from '../domain/Product';

export default class InventoryService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static isAvailable(product: Product): boolean {
    return true;
  }
}
