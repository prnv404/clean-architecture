
import {ValidatePassword ,GenerateSignature,GeneratePassword,GenerateSalt,FormateData, BadRequestError} from '@prnv404/ecom-common'
import {  IAddress, IWishlist, ICartItem,ISignIn, ISignUp  } from '../../types'
import { AddressEntite } from '../../entites/address.entite';
import { CustomerEntite } from '../../entites/customer.entite';
import { CustomerRepository } from "../repository/customer.repository";
import { Service } from 'typedi';


// All Business logic will be here
@Service()
export class CustomerUseCase {

    
    constructor(private repository:CustomerRepository) {}

    async SignIn(userInputs:ISignIn){

        try {

            const { email, password } = userInputs;
        
            const existingCustomer = await this.repository.FindCustomer(email);
            
    
            if(!existingCustomer){
                throw new BadRequestError("User not found")                
            }

            const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

            if (validPassword) {
                    
                const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id }, process.env.APP_SECRET!);
                
                return FormateData({ id: existingCustomer._id, token });
                
                }
            
            // return FormateData(null);
            
        } catch (error) {
            console.log(error)
        }
      
    }

    async SignUp(userInputs:ISignUp){
        
        let { email, password,phone } = userInputs;
        
        // create salt
        let salt = await GenerateSalt();
        
        password = await GeneratePassword(password, salt);

        let customer = new CustomerEntite({ email, password, phone, salt })

        const existingCustomer = await this.repository.CreateCustomer(customer);

        console.log(existingCustomer)

        const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id},process.env.APP_SECRET!);
        
        return FormateData({id: existingCustomer._id, token });

    }

    async AddNewAddress(_id:string,userInputs:IAddress){
        
        const { street, postalCode, city,country} = userInputs;

        const address = new AddressEntite({street,postalCode,city,country}) as any
        address._id = _id
        const addressResult = await this.repository.CreateAddress(address)

        return FormateData(addressResult);
    }

    async GetProfile(id:string){

        const existingCustomer = await this.repository.FindCustomerById(id);
        return FormateData(existingCustomer);
    }

    async GetShopingDetails(id:string){

        const existingCustomer = await this.repository.FindCustomerById(id);

        if(existingCustomer){
            // const orders = await this.shopingRepository.Orders(id);
           return FormateData(existingCustomer);
        }       
        return FormateData({ msg: 'Error'});
    }

    async GetWishList(customerId:string){
        const wishListItems = await this.repository.Wishlist(customerId);
        return FormateData(wishListItems);
    }

    async AddToWishlist(customerId:string, product:IWishlist){
         const wishlistResult = await this.repository.AddWishlistItem(customerId, product);        
        return FormateData(wishlistResult);
    }

    async ManageCart(customerId:string, product:ICartItem, qty:number, isRemove:boolean){
        const cartResult = await this.repository.AddCartItem(customerId, product, qty, isRemove);        
       return FormateData(cartResult);
    }

    async ManageOrder(customerId:string, order:string){
        const orderResult = await this.repository.AddOrderToProfile(customerId, order);
        return FormateData(orderResult);
    }

    async SubscribeEvents(payload:any){
 
        console.log('Triggering.... Customer Events')

        payload = JSON.parse(payload)

        const { event, data } =  payload;

        const { userId, product, order, qty } = data;

        switch(event){
            case 'ADD_TO_WISHLIST':
            case 'REMOVE_FROM_WISHLIST':
                this.AddToWishlist(userId,product)
                break;
            case 'ADD_TO_CART':
                this.ManageCart(userId,product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userId,product,qty, true);
                break;
            case 'CREATE_ORDER':
                this.ManageOrder(userId,order);
                break;
            default:
                break;
        }
 
    }

}

