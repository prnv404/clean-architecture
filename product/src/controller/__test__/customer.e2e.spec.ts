
import { CreateChannel } from '@prnv404/ecom-common';
import { MSG_QUEUE_URL, EXCHANGE_NAME } from '../../config';
import { ExpressApp } from '../../frameworks/express/app'
import request from 'supertest'

const initialize = async ()=>{
    const channel = await CreateChannel(MSG_QUEUE_URL, EXCHANGE_NAME);
    return channel
}


describe("CUSTOMER TEST CASE ",  () => {

    
    it('SHOULD RETURN 200 ', async () => {
        
        const channel = await initialize()

        const { app } = await ExpressApp(channel)
        
        const response = await request(app).get('/').send({})

        expect(response.statusCode).toBe(200)

    })


})