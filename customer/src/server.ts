import 'express-async-errors'
import 'reflect-metadata'
import { MONGO_URI, PORT } from './config';
import { ConnectDb } from './framework/mongodb'

import { expressApp, app } from './framework/express/app'

const StartServer = async () => {
    
    await ConnectDb(MONGO_URI);
    
    app.listen(PORT, () => {
          console.log(`listening to port ${PORT}`);
    })
    .on('error', (err) => {
        console.log(err);
        process.exit();
    })
    .on('close', () => {
    })
    

}

StartServer();


