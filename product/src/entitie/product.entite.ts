import { IProduct } from "../types";

export class ProductEntite implements IProduct{

    name: string
    desc: string
    banner: string
    type: string
    unit: number
    price:number
    available: boolean
    suplier: string
    
    constructor(productInput: IProduct) {
        this.name = productInput.name
        this.desc = productInput.desc
        this.banner = productInput.banner
        this.type = productInput.type
        this.unit = productInput.unit
        this.price = productInput.price
        this.available = productInput.available
        this.suplier = productInput.suplier
    }
    

}