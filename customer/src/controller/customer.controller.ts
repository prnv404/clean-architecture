import express, { Express, NextFunction, Request, Response } from 'express'


import { CustomerUseCase } from '../usecase/customer/customer.usecase';
// import { SubscribeMessage } from '../../utils';
import { UserAuth} from '@prnv404/ecom-common';


export const CustomerApi = (app:Express,usecase:CustomerUseCase) => {
    

    app.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
        
        const { email, password, phone } = req.body;

        const { data } = await usecase.SignUp({ email, password, phone });
        
        res.json(data);

    });

    app.post('/login',  async (req:Request,res:Response,next:NextFunction) => {
        
        const { email, password } = req.body;

        const data = await usecase.SignIn({ email, password});

        res.json(data);

    });

    app.post('/address', UserAuth, async (req: Request, res: Response, next: NextFunction) => {
        
        
        const { _id } = req.user!

        console.log(req.body)

        const { street, postalCode, city,country } = req.body;

        const { data } = await usecase.AddNewAddress(_id, { street, postalCode, city, country,_id });
        
        res.json(data);

    });
     

    app.get('/profile', UserAuth ,async (req:Request,res:Response,next:NextFunction) => {

        const { _id } = req.user!

        const { data } = await usecase.GetProfile(_id );

        res.json(data);

    });
     

    app.get('/shoping-details', UserAuth, async (req:Request,res:Response,next:NextFunction) => {
        
        const { _id } = req.user!
        const { data } = await usecase.GetShopingDetails(_id);
        return res.json(data);
        
    });
    
    app.get('/wishlist', UserAuth, async (req: Request, res: Response, next: NextFunction) => {
        
        const { _id } = req.user!

        const { data } = await usecase.GetWishList(_id);
        
        return res.status(200).json(data);

        
    });


}


