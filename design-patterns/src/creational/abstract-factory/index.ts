import GourmetPizzaFactory from './GourmetPizzaFactory';
import SicilianPizzaFactory from './SicilianPizzaFactory';

const gourmetPizzaFactory = new GourmetPizzaFactory();

const gourmetCheesePizza = gourmetPizzaFactory.createPizza('cheese');

gourmetCheesePizza.eat();

const gourmetPepperoniPizza = gourmetPizzaFactory.createPizza('pepperoni');

gourmetPepperoniPizza.eat();

const sicilianPizzaFactory = new SicilianPizzaFactory();

const sicilianPepperoniPizza = sicilianPizzaFactory.createPizza('pepperoni');

sicilianPepperoniPizza.eat();

const sicilianVeggiePizza = sicilianPizzaFactory.createPizza('veggie');

sicilianVeggiePizza.eat();
