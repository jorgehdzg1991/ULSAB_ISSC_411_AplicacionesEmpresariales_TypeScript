import _ from 'lodash';

export default abstract class Cloneable {
  public clone(): Cloneable {
    return _.cloneDeep(this);
  }
}
