import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import {app} from "../framework/express/app";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: any;
beforeAll(async () => {
 
  process.env.APP_SECRET ='secret'


  process.env.MONGO_URI = 'mongodb://localhost:27017/customer'
  

  process.env.MSG_QUEUE_URL = 'amqps://fdpozdyw:03LlAYadrVsV5Oh7Zhf7H8SV4xhBl_11@seal.lmq.cloudamqp.com/fdpozdyw'
  

  process.env.EXCHANGE_NAME = 'ONLINE_STORE'
  

  process.env.PORT = '8001'
  


  // const mongo = await MongoMemoryServer.create();
  // const mongoUri = mongo.getUri();

  await mongoose.connect(process.env.MONGO_URI,{});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

});

afterAll(async () => {
  
  await mongoose.connection.close();
  
});

// global.signin = async () => {
//   const email = "test@test.com";
//   const password = "password";

//   const response = await request(app)
//     .post("signup")
//     .send({
//       email,
//       password,
//     })
//     .expect(201);

//   const cookie = response.get("Set-Cookie");

//   return cookie;
// };
