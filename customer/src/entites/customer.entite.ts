

export interface ICustomer {
    email: string,
    password: string,
    salt: string,
    phone: string,

}

export class CustomerEntite implements ICustomer {
    email: string
    password: string
    salt: string
    phone: string

    constructor({ email, password, phone, salt }: ICustomer) {
        this.email = email
        this.password = password
        this.phone = phone
        this.salt = salt
    }
    
}