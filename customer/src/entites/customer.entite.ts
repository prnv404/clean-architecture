import { timeStamp } from "console"


export interface ICustomer {
    email: string,
    password: string,
    salt?: string,
    phone: string,
    address?: any[]
    cart?: any[]
    wishlist?: any[]
    orders?:any[]
}

export class CustomerEntite implements ICustomer {
    email: string
    password: string
    salt?: string
    phone: string
    address?: any[]
    cart?: any[]
    wishlist?: any[]
    orders?: any[]

    constructor({ email, password, phone, salt }: ICustomer) {
        this.email = email
        this.password = password
        this.phone = phone
        this.salt = salt
    }
    
}