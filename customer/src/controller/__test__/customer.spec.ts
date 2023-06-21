
import { Express } from "express";
import { ExpressApp } from "../../framework";
import request from 'supertest'


describe("CUSTOMER API TEST CASE ", () => {

    let application: Express

    beforeAll(async () => {

        const { app } = await ExpressApp()
        
        application = app


    })
    

    test('SIGNUP SHOULD RETURN 200 ', async () => {

        const response = await request(application).post('/signup').send({
            email: "email@gmail.com",
            password: "password",
            "phone":"123456789"
        })

        expect(response.statusCode).toEqual(200)

    })

    test('SIGNIN SHOULD RETURN 200', async () => {
        
        const response = await request(application).post('/login').send({
            email: "email@gmail.com",
            password:"password"
        })
       
        expect(response.statusCode).toEqual(200)

    })

    test("ADDRESS SHOULD ADDED AND RETURN WITH 200", async () => {
        
        const token = await signin()
        const response = await request(application).post("/address").set('Authorization', `Bearer ${token}`).send({
            street: "Street",
            postalCode: "Postalcode",
            city: "city",
            country: "country" 
        })
        
        expect(response.statusCode).toEqual(200)

    })

    test("SHOULD RETURN USER PROFILE WITH 200", async () => {

        const token = await signin()

        const response = await request(application).get('/profile').set('Authorization', `Bearer ${token}`).send({})

        expect(response.statusCode).toEqual(200)
        
    })

    test("SHOULD RETURN SHOPPING DETAILS WITH 200", async () => {

        const token = await signin()

        const response = await request(application).get('/shoping-details').set('Authorization', `Bearer ${token}`).send({})

        expect(response.statusCode).toEqual(200)

    })


    test("SHOULD RETURN WISHLIST WITH 200", async () => {

        const token = await signin()

        const response = await request(application).get('/wishlist').set('Authorization', `Bearer ${token}`).send({})

        expect(response.statusCode).toEqual(200)

    })


})