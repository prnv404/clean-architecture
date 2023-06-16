
import { ExpressApp } from "../../framework";
import request from 'supertest'


describe("CUSTOMER TEST CASE ", () => {

    
    test('SHOULD RETURN 200 ', async () => {

        const { app } = await ExpressApp()
        

        const response = await request(app).post('/signup').send({
            email: "email@gmail.com",
            password: "password",
            "phone":"123456789"
        })

        expect(response.statusCode).toEqual(200)

    })


})