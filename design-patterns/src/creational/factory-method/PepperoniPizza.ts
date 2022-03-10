import Pizza from './Pizza';

export default class PepperoniPizza extends Pizza {
  // eslint-disable-next-line class-methods-use-this
  public eat(): void {
    console.log('Yum pepperoni pizza!');
  }

  // eslint-disable-next-line class-methods-use-this
  public addIngredients(): void {
    console.log('Adding ingredients for pepperoni pizza.');
  }
}
