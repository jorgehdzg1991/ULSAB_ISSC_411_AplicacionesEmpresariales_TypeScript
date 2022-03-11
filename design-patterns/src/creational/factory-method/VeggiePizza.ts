import Pizza from './Pizza';

export default class VeggiePizza extends Pizza {
  public eat(): void {
    console.log('Yum veggie pizza!');
  }

  public addIngredients(): void {
    console.log('Adding ingredients for veggie pizza.');
  }
}
