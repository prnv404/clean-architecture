
import express, { Express } from 'express';
import amqplib from 'amqplib'
import cors from 'cors';
import { CustomerApi } from '../../controller/customer.controller'; 
import {CreateChannel, errorHandler} from '@prnv404/ecom-common'
import { CustomerUseCase } from '../../usecase/customer/customer.usecase';
import { MSG_QUEUE_URL, EXCHANGE_NAME } from '../../config';
import { IOCContainer} from '../../config/container.config'
const app = express()

export const ExpressApp = async () => {


    app.use(express.json());
    
    app.use(cors());

    const channel =await CreateChannel(MSG_QUEUE_URL,EXCHANGE_NAME)

    const container = IOCContainer()

    const service  = container.get<CustomerUseCase>(CustomerUseCase)

    CustomerApi(app, channel,service);
    
    app.use(errorHandler)    
    
}

export default app

