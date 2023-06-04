import { IProduct } from "../../types";

export abstract class  ProductRepository {

   abstract CreateProduct(productInput:IProduct): Promise<IProduct>
    
   abstract  Products(): Promise<IProduct[]>
    
   abstract FindById(id: string): Promise<IProduct>
    
   abstract FindByCategory(category: string): Promise<IProduct[]>
    
   abstract FindSelectedProducts(selectedIds: string[]): Promise<IProduct[]>
    

}