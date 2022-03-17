import Product from './Product';
import ProductCatalog from './ProductCatalog';

// Primary product for the main catalog
const mJeans = new Product('M: Jeans 32', 65);
const mTShirt = new Product('M: T Shirt 38', 65);

// Catalog for female products
const femaleProducts = new ProductCatalog('Female Products');
const fJeans = new Product('F: Jeans 32', 65);
const fTShirt = new Product('F: T Shirt 38', 65);
femaleProducts.add(fJeans);
femaleProducts.add(fTShirt);

// Catalog for kids products
const kidsProducts = new ProductCatalog('Kids Products');
const kJeans = new Product('K: Jeans 32', 65);
const kTShirt = new Product('K: T Shirt 38', 65);
kidsProducts.add(kJeans);
kidsProducts.add(kTShirt);

// Main catalog
const mainCatalog = new ProductCatalog('Main Catalog');
mainCatalog.add(mJeans);
mainCatalog.add(mTShirt);
mainCatalog.add(femaleProducts);
mainCatalog.add(kidsProducts);

// Print out catalog
mainCatalog.print();
