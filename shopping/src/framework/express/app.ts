import express, {Express} from 'express';
import cors from 'cors';
import { ShoppingApi } from '../../controller/shopping.controller';
import {  errorHandler } from '@prnv404/ecom-common'
import { ShoppingUseCase } from '../../usecase/shopping/shopping.usecase';
import { Channel } from 'amqplib';


export const ExpressApp = async (app:Express,channel:Channel,usecase:ShoppingUseCase) => {

    app.use(express.json());
    
    app.use(cors());


    ShoppingApi(app, channel,usecase);
    // error handling

    app.use(errorHandler)
    
}
