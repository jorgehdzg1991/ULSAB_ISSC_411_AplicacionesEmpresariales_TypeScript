import ICheese from './Cheese';

export default class MozzarellaCheese implements ICheese {
  public prepareCheese(): void {
    console.log('Preparing mozzarella cheese.');
  }
}
