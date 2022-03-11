import Sauce from './Sauce';

export default class CaliforniaOilSauce extends Sauce {
  // eslint-disable-next-line class-methods-use-this
  public prepareSauce(): void {
    console.log('Preparing california oil sauce.');
  }
}
