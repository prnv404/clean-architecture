import 'reflect-metadata'
import 'express-async-errors'
import express from 'express';
import { EXCHANGE_NAME, MONGO_URI, MSG_QUEUE_URL, PORT,configureIOCContainer } from './config';
import { ConnectDb } from './frameworks';
import { ExpressApp } from './frameworks/express/app';
import { CreateChannel } from '@prnv404/ecom-common';
import { ProductUseCase } from './usecase/product/product.usecase';


const StartServer = async() => {

    const app = express();
    
    await ConnectDb(MONGO_URI);

    const channel = await CreateChannel(MSG_QUEUE_URL, EXCHANGE_NAME);
    
    const container = configureIOCContainer()

    const usecase = container.get<ProductUseCase>(ProductUseCase)

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