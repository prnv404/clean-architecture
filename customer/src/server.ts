import 'reflect-metadata'
import express from 'express';
import { EXCHANGE_NAME, MONGO_URI, MSG_QUEUE_URL, PORT, configureIOCContainer } from './config';
import { ConnectDb } from './framework/mongodb'
import { CreateChannel } from "@prnv404/ecom-common"
import { ExpressApp } from './app';
import { CustomerUseCase } from './usecase/customer/customer.usecase';
import { Customer } from './framework/mongodb/model';


const StartServer = async () => {
    
    const app = express();

    const channel =await CreateChannel(MSG_QUEUE_URL,EXCHANGE_NAME)
    
    await ConnectDb(MONGO_URI);

    const container = configureIOCContainer()

    const usecase  = container.get<CustomerUseCase>(CustomerUseCase)

    await ExpressApp(app,channel,usecase);

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