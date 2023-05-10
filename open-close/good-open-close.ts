// Interface for defining type of products. 
interface IProductItem {
  quantity: number;
  type: IProductType;
  price: number;
}

// Interface Class for  defining a base class that we want to create another class based in this.
interface IProductType {
  id: string;
  calculatePrice(quantity: number, price: number): number;
}

// And we have these three classes which are responsible for calculating each product price based in it's type. 
// If we want to have another type, we can define another class and just use it. 
// This way we do not need to change any other part of code.
class PerItem implements IProductType {
  id = "PER_ITEM";
  calculatePrice(quantity: number, price: number): number {
    return price * quantity;
  }
}

class PerGram implements IProductType {
  id = "PER_GRAM";
  calculatePrice(quantity: number, price: number): number {
    return price * quantity;
  }
}

class PerBox implements IProductType {
  id = "PER_BOX";
  calculatePrice(quantity: number, price: number): number {
    if (quantity < 3) {
      return price * quantity;
    } else {
      return price * quantity - 4;
    }
  }
}

// Here in cart class we have two main methods. Cart class is only responsible for: 
// 1. adding new items .2 calculating total price and nothing more. 
// This class does not need to know how many of each product we have, 
// This class does not need to know how we should calculate price of each item based on its purchase type. 
// Its only responsible for adding and summing given prices. 
// This way we can maintain add new purchase type without changing even a dot inside Cart class. (So maintainable)
class Cart {
  mutableList: IProductItem[];

  constructor() {
    this.mutableList = [];
  }

  // This method is only responsible for getting previous items and add new one to it. 
  addItem(item: IProductItem) {
    let tempList = this.mutableList.map((i) => ({ ...i }));
    tempList = [...tempList, item];
    this.mutableList = tempList;
  }

  // This method is responsible for calculating total price based on given price if each item. 
  // It does not need to know how we do the calculation for finding each item price. 
  totalPrice() {
    let totalPrice = 0;
    this.mutableList.forEach((item) => {
      const { price, quantity, type } = item;
      const itemPrice = type.calculatePrice(quantity, price);
      totalPrice += itemPrice;
    });
    return totalPrice;
  }
}

const product_1: IProductItem = {
  quantity: 5,
  type: new PerItem(),
  price: 5,
};
const product_2: IProductItem = {
  quantity: 30,
  type: new PerGram(),
  price: 2,
};
const product_3: IProductItem = {
  quantity: 12,
  type: new PerBox(),
  price: 7,
};
const myInstance = new Cart();
myInstance.addItem(product_1);
myInstance.addItem(product_2);
myInstance.addItem(product_3);

const p = myInstance.totalPrice();
console.log(p);