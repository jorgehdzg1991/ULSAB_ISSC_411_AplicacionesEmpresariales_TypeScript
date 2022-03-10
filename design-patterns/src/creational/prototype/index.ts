import _ from 'lodash';
import Cell from './Cell';
import Membrane from './Membrane';
import Mitochondria from './Mitochondria';
import Nucleus from './Nucleus';

const nucleus = new Nucleus();
const mitochondria = new Mitochondria();
const membrane = new Membrane();

const firstCell = new Cell(nucleus, mitochondria, membrane);
const secondCell = firstCell.clone();

console.log(
  'Is firstCell the same object as secondCell? -->',
  firstCell === secondCell
);

console.log(
  'Is firstCell equal to secondCell -->',
  _.isEqual(firstCell, secondCell)
);
