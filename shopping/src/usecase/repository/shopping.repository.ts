import { OrderDoc } from "../../framework/mongodb/model";
import { ICartItem } from "../../types";

export abstract class ShoppingRepository {

   abstract Orders(customerId: string): Promise<any>
    
   abstract Cart(customerId: string): Promise<any>
    
   abstract AddCartItem(customerId: string, item: any, qty: number, isRemove: boolean): Promise<any>
    
    abstract CreateNewOrder(customerId: string, txnId: string): Promise<any>
    

}