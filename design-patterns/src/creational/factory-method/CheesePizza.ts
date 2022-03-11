import Pizza from './Pizza';

export default class CheesePizza extends Pizza {
  public eat(): void {
    console.log('Yum cheese pizza!');
  }

  public addIngredients(): void {
    console.log('Adding ingredients for cheese pizza.');
  }
}
