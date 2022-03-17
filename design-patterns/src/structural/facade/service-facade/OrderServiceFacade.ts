import Product from '../domain/Product';
import InventoryService from '../subcomponents/InventoryService';
import PaymentService from '../subcomponents/PaymentService';
import ShippingService from '../subcomponents/ShippingService';
import IOrderServiceFacade from './IOrderServiceFacade';

export default class OrderServiceFacade implements IOrderServiceFacade {
  placeOrder(productId: number): boolean {
    let orderFullfilled = false;

    const product = new Product(productId);

    if (InventoryService.isAvailable(product)) {
      console.log(`Product with ID "${productId}" is available.`);
      const paymentConfirmed = PaymentService.makePayment();

      if (paymentConfirmed) {
        console.log('Payment confirmed.');
        ShippingService.shipProduct(product);
        console.log('Product shipped.');
        orderFullfilled = true;
      }
    }

    return orderFullfilled;
  }
}
