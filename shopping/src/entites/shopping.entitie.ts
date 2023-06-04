import { ICartItem } from "../types"

interface IOrder {
    orderId: string
    customerId: string
    amount: number
    status: string
    items: ICartItem[]
}

export class OrderEntite {
    orderId: string
    customerId: string
    amount: number
    status: string
    items: ICartItem[]
    
    constructor({ amount, customerId, items, orderId, status, }: IOrder) {
        this.orderId = orderId
        this.amount = amount
        this.customerId = customerId
        this.status = status
        this.items = items
    }

}