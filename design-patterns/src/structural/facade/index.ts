import OrderServiceFacade from './service-facade/OrderServiceFacade';

const facade = new OrderServiceFacade();

const orderFulfilled = facade.placeOrder(12345);

console.log('Order fulfilled? ', orderFulfilled);
