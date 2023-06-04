import { Request } from "express"


export interface ICustomer {
    email: string,
    password: string,
    salt: string,
    phone: string,
}


export interface IAddress {
    _id: string,
    street: string,
    postalCode: string,
    city: string
    country: string
}

export interface IWishlist{
    _id: string
    name: string
    desc: string
    price: number
    available: string
    banner:string
}

export interface ICartItem {
    _id: string
    name: string
    price: string
    banner: string
    

}

export interface ISignUp {
    email: string
    password: string
    phone:string
}

export interface ISignIn {
    email: string
    password: string
}

export interface Payload {
    _id: string
    email:string
}
