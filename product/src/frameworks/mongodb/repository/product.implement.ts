import { Service } from "typedi";
import { IProduct } from "../../../types";
import { ProductRepository } from "../../../usecase/repository/product.repository";
import { Product } from "../model/product.model";

@Service()
export class ProductImplement implements ProductRepository {

    constructor() { }

    async CreateProduct(productInput: IProduct): Promise<IProduct> {

        const { name, desc, type, unit, price, available, suplier, banner } = productInput
        
        const product = new Product({
            name, desc, type, unit,price, available, suplier, banner
        })

        const productResult = await product.save();

        return productResult;
    }

   async  Products(): Promise<IProduct[]> {
        return await Product.find();
    }

    async FindById(id: string): Promise<IProduct> {   
        
        return (await Product.findById(id))!

    }

    async FindByCategory(category: string): Promise<IProduct[]> {
       
        const products = await Product.find({ type: category });
        return products;
        
    }

   async FindSelectedProducts(selectedIds: string[]): Promise<IProduct[]> {
        const products = await Product.find().where('_id').in(selectedIds.map(_id => _id)).exec();
        return products;
    }
    
    
}