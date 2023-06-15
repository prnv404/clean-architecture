import 'reflect-metadata'
import express, { Express } from "express";
import cors from "cors";
import { ProductApi } from "../../controller/product.controller";
import { CreateChannel, errorHandler } from "@prnv404/ecom-common"

import { ProductUseCase } from "../../usecase/product/product.usecase";
import {Channel} from 'amqplib'
import { configureIOCContainer, MSG_QUEUE_URL, EXCHANGE_NAME } from "../../config";

const app = express()


export const ExpressApp = async () => {
    
  app.use(express.json());

  app.use(cors());
  const container = configureIOCContainer()

  const usecase = container.get<ProductUseCase>(ProductUseCase)
    // const channel = await CreateChannel(MSG_QUEUE_URL, EXCHANGE_NAME);
         
    
  ProductApi(app, usecase);
  
  // error handling
  app.use(errorHandler)
  
    
};

ExpressApp().then().catch()


export default app