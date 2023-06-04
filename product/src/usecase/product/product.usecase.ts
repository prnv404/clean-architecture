import { ProductRepository } from "../repository/product.repository";
import { IProduct } from '../../types'
import { FormateData } from "@prnv404/ecom-common";
import { ProductEntite } from "../../entitie/product.entite";
import { Service } from "typedi";


// All Business logic will be here
@Service()
export class ProductUseCase {


    constructor(private repository:ProductRepository){ }
    

    async CreateProduct(productInputs: IProduct) {
        
        const product = new ProductEntite(productInputs)
        const productResult = await this.repository.CreateProduct(product)
        return FormateData(productResult);

    }
    
    async GetProducts() {
        
        const products = await this.repository.Products();

        type CategoryMap = { [key: string]: string }
        

        let categories:CategoryMap = {};

        products.map(({ type }) => {
            categories[type] = type ;
        });
        
        return FormateData({
            products,
            categories:  Object.keys(categories)  
           })

    }

    async GetProductDescription(productId:string){
        
        const product = await this.repository.FindById(productId);
        return FormateData(product)
    }

    async GetProductsByCategory(category:string){

        const products = await this.repository.FindByCategory(category);
        return FormateData(products)

    }

    async GetSelectedProducts(selectedIds:string[]){
        
        const products = await this.repository.FindSelectedProducts(selectedIds);
        return FormateData(products);

    }


    async GetProductPayload(userId:string,productInput:any,event:string){

        const { productId, qty } = productInput

         const product = await this.repository.FindById(productId);

        if(product){
             const payload = { 
                event: event,
                data: { userId, product, qty}
            };
 
             return FormateData(payload)
        }else{
            return FormateData({error: 'No product Available'});
        }

    }
 

}

