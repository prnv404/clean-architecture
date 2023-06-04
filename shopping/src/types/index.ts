export interface ICartItem {
    product: {
      _id: string;
      name: string;
      desc: string;
      banner: string;
      type: string;
      unit: number;
      price: number;
      suplier: string;
    };
    unit: number;
}
  

export interface IProduct {
    _id: string
    name: string,
    desc: string,
    banner: string,
    type: string,
    unit: number
    price: number
    suplier: string,
}