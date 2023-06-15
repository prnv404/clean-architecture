import 'reflect-metadata'
import express, { Express } from 'express';
import amqplib from 'amqplib'
import cors from 'cors';
import { CustomerApi } from '../../controller/customer.controller'; 
import {CreateChannel, errorHandler} from '@prnv404/ecom-common'
import { CustomerUseCase } from '../../usecase/customer/customer.usecase';
import { MSG_QUEUE_URL, EXCHANGE_NAME, configureIOCContainer } from '../../config';

 const app = express()


export async function expressApp() {

    app.use(express.json());
    
    app.use(cors());
    

    const container = configureIOCContainer()
    

    const usecase = container.get<CustomerUseCase>(CustomerUseCase)
    
 
   await CustomerApi(app, usecase);
    
    app.use(errorHandler)   
    
    
}
    

     
 expressApp().then().catch()

    


export {app}