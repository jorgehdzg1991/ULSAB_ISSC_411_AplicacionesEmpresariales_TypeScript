import Pizza from './Pizza';

export default class PepperoniPizza extends Pizza {
  public addIngredients(): void {
    console.log('Preparing ingredients for pepperoni pizza.');
    this.toppingFactory.createCheese();
    this.toppingFactory.createSauce();
  }

  public eat(): void {
    console.log('Yum pepperoni pizza.');
  }
}
