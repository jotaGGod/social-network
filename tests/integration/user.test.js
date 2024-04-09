const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { User, Token, sequelize } = require('../../src/database/models');

describe('Testing user feature', () => {
  let tempUser;
  let bodyUser;
  beforeAll(async () => {
    tempUser = await User.create({
      id: 10000,
      full_name: 'Tadeu Smith',
      email: 'tadeusmit@gmail.com',
      password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    });  
    bodyUser = {
      full_name: 'Tadeuzinho Smith',
      email: 'tadeusmiit@gmail.com'
    };
  });
  afterAll(async () => {
    await Token.destroy({ where: { user_id: tempUser.id } });
    await User.destroy({ where: { id: tempUser.id } });
    await sequelize.close();  
  });
  it('Should return all users', async () => {
      const loginResponse = await request(app).post('/login').send({"email": tempUser.email, "password": "1234"});
      const users = await request(app).get('/users').set('Authorization', loginResponse.body.token);
      expect(users.status).toBe(200);
      expect(users.body).toBeDefined();
  });
  it('Should return a user by id', async () => {
    const user = await request(app).get(`/users/${tempUser.id}`);
    expect(user.status).toBe(httpStatus.OK);
    expect(user.body).toBeDefined();
  });
  
  it('Should return login success', async () => {
    const login = await request(app).post('/login').send({ email: tempUser.email, password: '1234' });
    expect(login.status).toBe(httpStatus.OK);
    expect(login.body.token).toBeDefined();
  });
  it('Should update a user', async () => {
    const updatedUser = await request(app).put(`/users/${tempUser.id}`).send(bodyUser);
    expect(updatedUser.status).toBe(httpStatus.OK);
    expect(updatedUser.body.details).toBe('User updated successfully');
  });
  // it('Should delete a user', async () => {
  //   const deletedUser = await request(app).delete(`/users/${tempUser.id}`);
  //   expect(deletedUser.status).toBe(200);
  //   expect(deletedUser.body.details).toBe('User deleted successfully');
  // });
  it('Should not update a user', async () => {
    const updatedUser = await request(app).put(`/users/${tempUser.id}`).send({});
    expect(updatedUser.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
  });
  // it('Should not authenticate a user', async () => {
  //   const login = await request(app).post('/login').send({ email: '123@gmail.com', password: '55555' });
  //   expect(login.status).toBe(httpStatus.UNAUTHORIZED);
  // });
});
