import { ICustomer,  IWishlist, ICartItem } from "../../types"
import { CustomerEntite } from "../../entites/customer.entite"


export abstract class CustomerRepository {

    abstract CreateCustomer({ email, password, phone, salt }: CustomerEntite): Promise<any>
    
    abstract CreateAddress({ city, country, postalCode, street ,_id}: any): Promise<any>
    
    abstract FindCustomer(email: string): Promise<any>
    
    abstract FindCustomerById(id: string): Promise<any>
    
    abstract Wishlist(customerId: string): Promise<any>
    
    abstract AddWishlistItem(customerId: string, Input: IWishlist): Promise<any>
    
    abstract  AddCartItem(customerId: string, Input:ICartItem, qty:number, isRemove:boolean):Promise<ICustomer>
    
    abstract AddOrderToProfile(customerId:string, order:string):Promise<ICustomer>

}