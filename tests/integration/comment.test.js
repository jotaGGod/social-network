const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require("../../src/database/config/db");

describe('Testing comment feature', () => {
  let tempUser;
  let tempPost;
  let tempFileType;
  let tempTargetPublic;
  let loginResponse;
  let bodyComment;
  let bodyCreateComment;
  let token;

  beforeAll(async () => {
    await db('user').insert({
      id: 100,
      full_name: 'Luiz Cruz',
      email: 'luiz@gmail.com',
      password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    });
    tempUser = await db('user').where({ id: 100 }).first();

    await db('target_public').insert({
      id: 100,
      type: "test",
      is_active: true
    });
    tempTargetPublic = await db('target_public').where({ id: 100 }).first();

    await db('file_type').insert({
      id: 100,
      type: 'test',
      is_active: true
    });
    tempFileType = await db('file_type').where({ id: 100 }).first();

    await db('post').insert({
      id: 1000,
      description: "Test Post",
      user_id: tempUser.id,
      target_id: tempTargetPublic.id,
      type_id: tempFileType.id,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true
    });
    tempPost = await db('post').where({ id: 1000 }).first();

    loginResponse = await request(app).post('/login').send({ email: tempUser.email, password: "1234" });
    token = loginResponse.body.token;

    [tempCommentId] = await db('comment').insert(
        {
          id:100,
          description: 'test comment',
          user_id: tempUser.id,
          post_id: tempPost.id
    });
     [bodyComment] = await db('comment').insert(
        {
          id:200,
          description: 'Creating a test comment ',
          user_id: tempUser.id,
          post_id: tempPost.id
        });
    bodyCreateComment = await db('comment').where({ id: 200 }).first();

  });
  afterAll(async () => {
    await db('token').del();
    await db('comment').del();
    await db('post').del();
    await db('user').del();
    await db('file_type').del();
    await db('target_public').del();
    await db.destroy();
  });

  it('Should create a comment when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).post('/comments').send(bodyCreateComment).set('Authorization', token);
    expect(response.status).toBe(httpStatus.CREATED);
    expect(response.body.data).toBeDefined();
  });

  it('Should return a bad request if trying to create a comment with missing fields', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).post('/comments').send({}).set('Authorization', token);
    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it('Should get a comment by id when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).get(`/comments/${tempCommentId}`).set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toBeDefined();
  });

  it('Should get all comments when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).get('/comments').set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toBeDefined();
  });

  it('Should update a comment when authorized with valid token', async () => {
    const updatedCommentData = {
      description: 'This is an updated test comment',
      user_id: tempUser.id,
      post_id: tempPost.id
    };
    const response = await request(app).put(`/comments/${tempCommentId}`).send(updatedCommentData).set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.details).toBe('Comment updated successfully');
  });

  it('Should delete a comment when authorized with valid token', async () => {
    const { token } = loginResponse.body;
    const response = await request(app).delete(`/comments/${tempCommentId}`).set('Authorization', token);
    expect(response.status).toBe(httpStatus.OK);
    expect(response.body.details).toBe('Comment deleted successfully');
  });


});
