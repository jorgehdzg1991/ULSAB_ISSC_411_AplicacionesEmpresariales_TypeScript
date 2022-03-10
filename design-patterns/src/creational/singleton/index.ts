import SingletonCounter from './singleton';

const counter = SingletonCounter.getInstance();

console.log('Count in "counter" is ', counter.count);

counter.addOne();

console.log('Count in "counter" is', counter.count);

const shouldBeTheSameCounter = SingletonCounter.getInstance();

console.log('Count in "shouldBeTheSameCounter" is', shouldBeTheSameCounter.count);

console.log('counter === shouldBeTheSameCounter -->', counter === shouldBeTheSameCounter);
