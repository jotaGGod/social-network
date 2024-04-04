const request = require('supertest');
const app = require('../../app');
const { User, Token, sequelize } = require('../../src/database/models');

describe('Testing user feature', () => {
  let tempUser;
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
  // it('Should return users', async () => {
  //     const { token } = await request(app).post('/login').send({"email": tempUser.email, "password": "1234"});
  //     const users = await (await request(app).get('/users')).set('authorization', token);
  //     expect(users.status).toBe(200);
  //     expect(Array.isArray(users.body)).toBe(true);
  //     const usersFromDB = await User.findAll();
  //     expect(users.body.length).toBe(usersFromDB.length);       
  // });
  it('Should return a user by id', async () => {
    const user = await request(app).get(`/users/${tempUser.id}`);
    expect(user.status).toBe(200);
    expect(user.body).toBeDefined();
  });
  
  it('Should return login success', async () => {
    const login = await request(app).post('/login').send({ email: tempUser.email, password: '1234' });
    expect(login.status).toBe(200);
    expect(login.body.token).toBeDefined();
  });
  it('Should update a user', async () => {
    const updatedUser = await request(app).put(`/users/${tempUser.id}`).send(bodyUser);
    expect(updatedUser.status).toBe(200);
    expect(updatedUser.body.details).toBe('User updated successfully');
  });
  it('Should delete a user', async () => {
    const deletedUser = await request(app).delete(`/users/${tempUser.id}`);
    expect(deletedUser.status).toBe(200);
    expect(deletedUser.body.details).toBe('User deleted successfully');
  });
});
