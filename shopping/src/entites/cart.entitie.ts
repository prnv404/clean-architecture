import { ICartItem } from "../types";

export class CartItemEntite {
    
    product
    unit:number
    
    constructor({product,unit}:ICartItem) {
        this.product = product
        this.unit = unit
    }

}