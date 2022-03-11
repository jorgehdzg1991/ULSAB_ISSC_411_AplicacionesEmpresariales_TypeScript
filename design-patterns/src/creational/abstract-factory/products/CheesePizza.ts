import Pizza from './Pizza';

export default class CheesePizza extends Pizza {
  public addIngredients(): void {
    console.log('Preparing ingredients for cheese pizza.');
    this.toppingFactory.createCheese();
    this.toppingFactory.createSauce();
  }

  public eat(): void {
    console.log('Yum cheese pizza.');
  }
}
