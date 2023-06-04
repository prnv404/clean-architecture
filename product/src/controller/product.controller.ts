import { CUSTOMER_SERVICE, EXCHANGE_NAME, SHOPPING_SERVICE } from '../config'

import { Express,Request,Response,NextFunction } from "express";
import * as amqplib from 'amqplib'
import { UserAuth, PublishMessage } from "@prnv404/ecom-common";
import { IProduct } from '../types';
import { ProductUseCase } from '../usecase/product/product.usecase';



export const ProductApi = (app: Express, channel: amqplib.Channel,usecase:ProductUseCase) => {
  

  app.post("/product/create", async (req, res, next) => {

    const { name, desc, type, unit, price, available, suplier, banner }:IProduct = req.body;
    
    // validation

    const { data } = await usecase.CreateProduct({
      name,
      desc,
      type,
      unit,
      price,
      available,
      suplier,
      banner,
    });

    return res.json(data);

  });

  app.get("/category/:type", async (req: Request, res: Response, next: NextFunction) => {
    
    const type = req.params.type;

    try {

      const { data } = await usecase.GetProductsByCategory(type);

      return res.status(200).json(data);

    } catch (error) {

      return res.status(404).json({ error });

    }

  });

  app.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
    
    const productId = req.params.id;

    try {

      const { data } = await usecase.GetProductDescription(productId);

      return res.status(200).json(data);

    } catch (error) {

      return res.status(404).json({ error });

    }
  });

  app.post("/ids", async (req: Request, res: Response, next: NextFunction) => {
    
    const { ids } = req.body;

    const products = await usecase.GetSelectedProducts(ids);

    return res.status(200).json(products);

  });

  app.put("/wishlist", UserAuth, async (req: Request, res: Response, next: NextFunction) => {

    const { _id } = req.user!

    const { data } = await usecase.GetProductPayload( _id, { productId: req.body._id }, "ADD_TO_WISHLIST");

    // PublishCustomerEvent(data);
    PublishMessage(channel,EXCHANGE_NAME, CUSTOMER_SERVICE, JSON.stringify(data));

    res.status(200).json(data.data.product);
  });

  app.delete("/wishlist/:id", UserAuth, async (req: Request, res: Response, next: NextFunction) => {

    const { _id } = req.user!

    const productId = req.params.id;

    const { data } = await usecase.GetProductPayload(
      _id,
      { productId },
      "REMOVE_FROM_WISHLIST"
    );

    // PublishCustomerEvent(data);
    PublishMessage(channel,EXCHANGE_NAME, CUSTOMER_SERVICE, JSON.stringify(data));

    res.status(200).json(data.data.product);
    
  });

  app.put("/cart", UserAuth, async (req:Request, res:Response, next:NextFunction) => {

    const { _id } = req.user!

    const { data } = await usecase.GetProductPayload(
      _id,
      { productId: req.body._id, qty: req.body.qty },
      "ADD_TO_CART"
    );

    // PublishCustomerEvent(data);
    // PublishShoppingEvent(data);

    PublishMessage(channel,EXCHANGE_NAME, CUSTOMER_SERVICE, JSON.stringify(data));
    PublishMessage(channel,EXCHANGE_NAME, SHOPPING_SERVICE, JSON.stringify(data));

    const response = { product: data.data.product, unit: data.data.qty };

    res.status(200).json(response);

  });

  app.delete("/cart/:id", UserAuth, async (req, res, next) => {

    const { _id } = req.user!

    const productId = req.params.id;

    const { data } = await usecase.GetProductPayload(
      _id,
      { productId },
      "REMOVE_FROM_CART"
    );

    PublishMessage(channel,EXCHANGE_NAME, CUSTOMER_SERVICE, JSON.stringify(data));
    PublishMessage(channel,EXCHANGE_NAME, SHOPPING_SERVICE, JSON.stringify(data));

    const response = { product: data.data.product, unit: data.data.qty };

    res.status(200).json(response);

  });



  //get Top products and category
  app.get("/", async (req, res, next) => {
    //check validation
    try {

      const { data } = await usecase.GetProducts();
      return res.status(200).json(data);

    } catch (error) {

      return res.status(404).json({ error });

    }

  });
  
};
