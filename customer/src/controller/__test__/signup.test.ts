import request from 'supertest';
import {app} from '../../framework/express/app';

it('returns a 200 on successful signup', async () => {
  const resopnse =  await request(app)
    .post('/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
      phone:'1234'
    })
    expect(resopnse.statusCode).toBe(200)
});


it('returns a 200 successfull login', async () => {

  const resopnse = await request(app).post('/login').send({
    email: 'test@gmail.com',
    password:"password"
  })

  expect(resopnse.statusCode).toBe(200)


})

