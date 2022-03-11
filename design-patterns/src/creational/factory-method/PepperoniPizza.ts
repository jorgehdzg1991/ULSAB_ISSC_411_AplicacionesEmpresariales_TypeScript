import Pizza from './Pizza';

export default class PepperoniPizza extends Pizza {
  public eat(): void {
    console.log('Yum pepperoni pizza!');
  }

  public addIngredients(): void {
    console.log('Adding ingredients for pepperoni pizza.');
  }
}
