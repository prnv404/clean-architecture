import express, { Express }  from "express";
import cors from "cors";
import { ProductApi } from "./controller/product.controller";
import { CreateChannel,errorHandler } from "@prnv404/ecom-common"
import { EXCHANGE_NAME, MSG_QUEUE_URL } from "./config";
import { ProductImplement } from "./frameworks";
import { ProductUseCase } from "./usecase/product/product.usecase";
import {Channel} from 'amqplib'




export const ExpressApp = async (app: Express,channel:Channel,usecase:ProductUseCase) => {
    
  app.use(express.json());

  app.use(cors());
         
    
  ProductApi(app, channel, usecase);
  
  // error handling
  app.use(errorHandler)
  
    
};
