import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

let mongo: any;
beforeAll(async () => {
  process.env.APP_SECRET = "asdfasdf";
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  // process.env.MONGO_URI = 'mongodb://localhost:27017/customer'


  if (process.env.NODE_ENV ==='dev' ) {
    await mongoose.connect('mongodb://localhost:27017/customer')
  } else {
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();
    await mongoose.connect(mongoUri);
    
    
    
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
    const collections = await mongoose.connection.db.collections();
      for (let collection of collections) {
        await collection.deleteMany({});
      }
  
  if (mongo) {
     mongo.stop();
  }

  await mongoose.connection.close();

});
