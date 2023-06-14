import request from 'supertest';
import  app  from '../../framework/express/app'

it('responds with details about the current customer', async () => {

  
    const response = await request(app)
      .get('/profile').send()
      .expect(404);
  });
  