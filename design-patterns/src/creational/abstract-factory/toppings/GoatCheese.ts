import ICheese from './Cheese';

export default class GoatCheese extends ICheese {
  // eslint-disable-next-line class-methods-use-this
  public prepareCheese(): void {
    console.log('Preparing goat cheese.');
  }
}
