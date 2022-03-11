import Pizza from './Pizza';

export default class PepperoniPizza extends Pizza {
  // eslint-disable-next-line class-methods-use-this
  public addIngredients(): void {
    console.log('Preparing ingredients for pepperoni pizza.');
    this.toppingFactory.createCheese();
    this.toppingFactory.createSauce();
  }

  // eslint-disable-next-line class-methods-use-this
  public eat(): void {
    console.log('Yum pepperoni pizza.');
  }
}
