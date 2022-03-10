import Pizza from './Pizza';

export default class VeggiePizza extends Pizza {
  // eslint-disable-next-line class-methods-use-this
  public eat(): void {
    console.log('Yum veggie pizza!');
  }

  // eslint-disable-next-line class-methods-use-this
  public addIngredients(): void {
    console.log('Adding ingredients for veggie pizza.');
  }
}
