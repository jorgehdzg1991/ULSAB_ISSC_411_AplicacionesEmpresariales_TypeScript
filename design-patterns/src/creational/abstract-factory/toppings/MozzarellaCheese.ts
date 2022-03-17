import Cheese from './Cheese';

export default class MozzarellaCheese extends Cheese {
  public prepareCheese(): void {
    console.log('Preparing mozzarella cheese.');
  }
}
