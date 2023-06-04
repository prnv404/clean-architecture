import { CUSTOMER_SERVICE, EXCHANGE_NAME, SHOPPING_SERVICE } from '../config';
import { Express, NextFunction, Request, Response } from 'express'
import * as amqplib from 'amqplib'
import { SubscribeMessage, UserAuth, PublishMessage } from '@prnv404/ecom-common';
import { ShoppingUseCase } from '../usecase/shopping/shopping.usecase';


export const ShoppingApi = (app: Express, channel: amqplib.Channel,usecase:ShoppingUseCase) => {


    SubscribeMessage(channel, EXCHANGE_NAME,SHOPPING_SERVICE,usecase)

    app.post('/order',UserAuth, async (req:Request,res:Response,next:NextFunction) => {

       
        const { _id } = req.user! 

        const { txnNumber } = req.body;

        const { data } = await usecase.PlaceOrder({_id, txnNumber});
        
        const payload = await usecase.GetOrderPayload(_id, data, 'CREATE_ORDER')

        PublishMessage(channel,EXCHANGE_NAME,CUSTOMER_SERVICE, JSON.stringify(payload))

        res.status(200).json(data);

    });

    app.get('/orders',UserAuth, async (req:Request,res:Response,next:NextFunction) => {

        const { _id } = req.user! 


        const { data } = await usecase.GetOrders(_id);
        
        res.status(200).json(data);

    });

    app.put('/cart',UserAuth, async (req:Request,res:Response,next:NextFunction) => {

        const { _id } = req.user! 

        const {item,qty,isRemove}  = req.body

        const { data } = await usecase.ManageCart(_id,item,qty,isRemove);
        
        res.status(200).json(data);

    });

    app.delete('/cart/:id',UserAuth, async (req:Request,res:Response,next:NextFunction) => {

        const { _id } = req.user! 

        const {item,qty,isRemove}  = req.body

        const { data } = await usecase.ManageCart(_id, item,qty,isRemove);
        
        res.status(200).json(data);

    });
    
    app.get('/cart', UserAuth, async (req:Request,res:Response,next:NextFunction) => {

        const { _id } = req.user! 

        
        const { data } = await usecase.GetCart( _id );

        return res.status(200).json(data);
    });

    app.get('/whoami', (req,res,next) => {
        return res.status(200).json({msg: '/shoping : I am Shopping Service'})
    })
 
}
