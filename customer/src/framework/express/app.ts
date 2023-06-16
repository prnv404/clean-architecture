import 'reflect-metadata'
import express, { Express } from 'express';
import amqplib from 'amqplib'
import cors from 'cors';
import { CustomerApi } from '../../controller/customer.controller'; 
import {errorHandler} from '@prnv404/ecom-common'
import { CustomerUseCase } from '../../usecase/customer/customer.usecase';
import { configureIOCContainer } from '../../config/container.config';


const container = configureIOCContainer()

const usecase = container.get<CustomerUseCase>(CustomerUseCase)

export const ExpressApp = async () => {
    
    const app = express()

    app.use(express.json());
    
    app.use(cors());

    CustomerApi(app,usecase);
    
    app.use(errorHandler)    
    
    return { app, usecase }
    
}


export default usecase