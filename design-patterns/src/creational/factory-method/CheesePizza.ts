import Pizza from './Pizza';

export default class CheesePizza extends Pizza {
  // eslint-disable-next-line class-methods-use-this
  public eat(): void {
    console.log('Yum cheese pizza!');
  }

  // eslint-disable-next-line class-methods-use-this
  public addIngredients(): void {
    console.log('Adding ingredients for cheese pizza.');
  }
}
