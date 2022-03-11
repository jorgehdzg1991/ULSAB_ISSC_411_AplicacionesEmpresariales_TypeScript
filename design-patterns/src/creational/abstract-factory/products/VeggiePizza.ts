import Pizza from './Pizza';

export default class VeggiePizza extends Pizza {
  public addIngredients(): void {
    console.log('Preparing ingredients for veggie pizza.');
    this.toppingFactory.createCheese();
    this.toppingFactory.createSauce();
  }

  public eat(): void {
    console.log('Yum veggie pizza.');
  }
}
