import Sauce from './Sauce';

export default class TomatoSauce extends Sauce {
  // eslint-disable-next-line class-methods-use-this
  public prepareSauce(): void {
    console.log('Preparing tomato sauce.');
  }
}
