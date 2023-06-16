import 'reflect-metadata'
import express, { Express } from "express";
import cors from "cors";
import { ProductApi } from "../../controller/product.controller";
import { errorHandler } from "@prnv404/ecom-common"

import { ProductUseCase } from "../../usecase/product/product.usecase";
import {Channel} from 'amqplib'
import { configureIOCContainer } from "../../config/container.config";


export const ExpressApp = async (channel:Channel) => {
  
  const app = express()

  app.use(express.json());

  app.use(cors());
         
  const container = configureIOCContainer()

  const usecase = container.get<ProductUseCase>(ProductUseCase)

  ProductApi(app, channel, usecase);
  
  // error handling
  app.use(errorHandler)
  
  return { app }
  
    
};
