import 'express-async-errors'

import 'reflect-metadata'
import express from 'express';
import { EXCHANGE_NAME, MONGO_URI, MSG_QUEUE_URL, PORT } from './config';
import { ConnectDb } from './framework/mongodb'
import { CreateChannel } from "@prnv404/ecom-common"
import { ExpressApp } from './framework'; 
import { CustomerUseCase } from './usecase/customer/customer.usecase';

const app = express();

const StartServer = async () => {
    
    

    const channel =await CreateChannel(MSG_QUEUE_URL,EXCHANGE_NAME)
    
    await ConnectDb(MONGO_URI);

  

    await ExpressApp();

    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
        channel.close();
    })
    

}

StartServer();
export { app }
