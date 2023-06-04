

import express, { Express } from 'express';
import amqplib from 'amqplib'
import cors from 'cors';
import { CustomerApi } from './controller/customer.controller'
import {errorHandler} from '@prnv404/ecom-common'
import { CustomerUseCase } from './usecase/customer/customer.usecase';


export const ExpressApp = async (app: Express,channel:amqplib.Channel,service:CustomerUseCase) => {
    
    app.use(express.json());
    
    app.use(cors());
  
    CustomerApi(app, channel,service);
    
    app.use(errorHandler)    
    
}
