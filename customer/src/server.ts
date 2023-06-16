import 'reflect-metadata'
import 'express-async-errors'

import 'reflect-metadata'
import express from 'express';
import { CUSTOMER_SERVICE, EXCHANGE_NAME, MONGO_URI, MSG_QUEUE_URL, PORT, configureIOCContainer } from './config';
import { ConnectDb } from './framework/mongodb'
import { CreateChannel, SubscribeMessage } from "@prnv404/ecom-common"
import { ExpressApp } from './framework'; 
import { CustomerUseCase } from './usecase/customer/customer.usecase';


const StartServer = async () => {
    

    const channel = await CreateChannel(MSG_QUEUE_URL, EXCHANGE_NAME)
    
    await ConnectDb(MONGO_URI);
    
    const { app ,usecase} = await ExpressApp()

    await SubscribeMessage(channel, EXCHANGE_NAME, CUSTOMER_SERVICE, usecase);

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        // channel.close();
    })
    

}

StartServer();