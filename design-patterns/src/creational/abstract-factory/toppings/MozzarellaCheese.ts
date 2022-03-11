import ICheese from './Cheese';

export default class MozzarellaCheese implements ICheese {
  // eslint-disable-next-line class-methods-use-this
  public prepareCheese(): void {
    console.log('Preparing mozzarella cheese.');
  }
}
