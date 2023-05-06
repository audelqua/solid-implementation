// Implement open close principle inside example below: 
// We have a cart that user can add items to it. 
// In this cart we want to calculate total price of added items. 
// **** =>  items has two identifiers
// **** =>  1. quantity .2 type 
// **** => about types: we have three different types: 1. PER_ITEM 2. PER_GRAM 3. PER_BOX

interface IProductItem {
    quantity: number;
    type: string;
    price: number
}

interface IProductType { 
    [key: string]: string
}

const ProductTypes: IProductType = {
    PER_ITEM: "PER_ITEM",
    PER_GRAM: "PER_GRAM",
    PER_BOX: "PER_BOX",
}

class Cart {
    mutableList: IProductItem[]

    constructor() {
        this.mutableList = [] as IProductItem[]
    }

    addItem(item: IProductItem) {
        let tempList = this.mutableList.map(i => ({...i}))
        tempList = [...tempList, item]
        this.mutableList = tempList
    }

    totalPrice() {
        let totalPrice = 0
        this.mutableList.forEach(item => {
            switch(ProductTypes[item.type]) {
                case 'PER_ITEM': {
                    const { price, quantity } = item
                    let itemPrice = 0;
                    itemPrice = price * quantity
                    totalPrice += itemPrice
                    break
                }
                case 'PER_GRAM': {
                    const { price, quantity } = item
                    let itemPrice = 0;
                    itemPrice = price * quantity;
                    totalPrice += itemPrice
                    break
                }
                case 'PER_BOX': {
                    const { price, quantity } = item
                    let itemPrice = 0;
                    if(quantity < 3) itemPrice = price * quantity;
                    else itemPrice = (price * quantity) - 4;
                    totalPrice += itemPrice
                    break
                }
                default: {
                    break;
                }
            }
        })
        return totalPrice
    }
}


const product_1: IProductItem = {
    quantity: 5,
    type: 'PER_ITEM',
    price: 5
}
const product_2: IProductItem = {
    quantity: 30,
    type: 'PER_GRAM',
    price: 2
}
const product_3: IProductItem = {
    quantity: 12,
    type: 'PER_BOX',
    price: 7
}
const myInstance = new Cart()
myInstance.addItem(product_1)
myInstance.addItem(product_2)
myInstance.addItem(product_3)

const p = myInstance.totalPrice()
console.log(p);


// Why its a bad practice? 
// Based on single responsibilities, if we want to add another type to out product we have to modify all the class again, 
// run all the tests again and check everything is working fine. 
