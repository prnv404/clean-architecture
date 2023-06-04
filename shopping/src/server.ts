import 'express-async-errors'
import 'reflect-metadata'
import express from 'express';
import { EXCHANGE_NAME, MONGO_URI, MSG_QUEUE_URL, PORT, configureIOCContainer } from './config';
import { ConnectDb } from './framework/index'
import { ExpressApp } from './app';
import { CreateChannel } from '@prnv404/ecom-common';
import { ShoppingUseCase } from './usecase/shopping/shopping.usecase';

const StartServer = async() => {

    const app = express();
    
    await ConnectDb(MONGO_URI);

    const channel = await  CreateChannel(MSG_QUEUE_URL,EXCHANGE_NAME)

    const container = configureIOCContainer()

    const usecase = container.get<ShoppingUseCase>(ShoppingUseCase)

    await ExpressApp(app,channel,usecase);

    app.listen(PORT, () => {
        console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })

}

StartServer();

