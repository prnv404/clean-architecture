import request from 'supertest';
import app from '../../frameworks/express/app';

it('returns a 200 on successful ', async () => {
  const resopnse =  await request(app)
    .get('/')
    .send()
    expect(resopnse.statusCode).toBe(200)
});


// it('returns a 200 successfull login', async () => {

//   const resopnse = await request(app).post('/login').send({
//     email: 'test@gmail.com',
//     password:"password"
//   })

//   expect(resopnse.statusCode).toBe(200)


// })

