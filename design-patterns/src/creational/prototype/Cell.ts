import Cloneable from './Cloneable';
import Membrane from './Membrane';
import Mitochondria from './Mitochondria';
import Nucleus from './Nucleus';

export default class Cell extends Cloneable {
  private nucleus: Nucleus;

  private mitochondria: Mitochondria;

  private membrane: Membrane;

  constructor(
    nucleus: Nucleus,
    mitochondria: Mitochondria,
    membrane: Membrane
  ) {
    super();
    this.nucleus = nucleus;
    this.mitochondria = mitochondria;
    this.membrane = membrane;
  }
}
