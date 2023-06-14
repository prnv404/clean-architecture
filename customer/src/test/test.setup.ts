import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";


// declare global {
//   var signin: () => Promise<any>;
// }

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

 
  await mongoose.connect(process.env.MONGO_URI!);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }

});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

// global.signin = async () => {
//   const email = "test@test.com";
//     const password = "password";
//      const phone = '123455'

//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email,
//       password,
//     })
//     .expect(201);

//     console.log(response)
// };
