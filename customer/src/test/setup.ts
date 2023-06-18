import { Express } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from 'supertest'
import { ExpressApp } from "../framework";

declare global {
  var signin:() => Promise<string>;
}

let mongo: any;
let application :Express
beforeAll(async () => {
  process.env.APP_SECRET = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // process.env.MONGO_URI = 'mongodb://localhost:27017/customer'
  const { app } = await ExpressApp()
  application = app
  


  if (process.env.NODE_ENV ==='dev' ) {
    await mongoose.connect('mongodb://localhost:27017/customer')
  } else {
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
    
  }


});

// beforeEach(async () => {
//   // const collections = await mongoose.connection.db.collections();
//   // for (let collection of collections) {
//   //   await collection.deleteMany({});
//   // }
// });

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany({});
        await collection.drop()
      }
  
  if (mongo) {
    await mongo.stop();
  }

  await mongoose.connection.close();
  
});




global.signin = async () => {
  const response = await request(application)
    .post("/login")
    .send({
      email: "email@gmail.com",
      password: "password"
    })
    .expect(200);

  return response.body.data.token
}