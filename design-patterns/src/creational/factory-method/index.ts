import PizzaFactory from './PizzaFactory';

const pizzaFactory = new PizzaFactory();

const cheesePizza = pizzaFactory.makePizza('cheese');

cheesePizza.eat();

const pepperoniPizza = pizzaFactory.makePizza('pepperoni');

pepperoniPizza.eat();
