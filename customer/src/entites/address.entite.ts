
export interface IAddress {
    street:string
    postalCode:string
    city:string
    country:string
}

export class AddressEntite implements IAddress {
    street:string
    postalCode:string
    city:string
    country: string
    
    constructor({street,postalCode,city,country}:IAddress) {
        this.street = street
        this.postalCode = postalCode
        this.city = city
        this.country = country
    }

}