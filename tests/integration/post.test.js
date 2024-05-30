const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { Post, sequelize } = require('../../database/models');

describe('Testing post feature', () => {
    let tempPost;
    let bodyPost;
    beforeAll(async () => {
        tempPost = await Post.create({
            id: 1000,
            description: "Test Post",
            user_id: 1,
            target_id: 2,
            type_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        bodyPost = { 
            description: "Test Post",
            user_id: 1,
            target_id: 2,
            type_id: 3
         };
    });
    afterAll(async () => {
        await Post.destroy({ where: { id: tempPost.id } });
        await sequelize.close();
    });
    it('Should return a list of posts', async () => {
        const posts = await request(app).get('/post');
        expect(posts.status).toBe(httpStatus.OK);
        expect(Array.isArray(posts.body)).toBe(true);
        expect(posts.body).toBeDefined();
    });
    it('Should return a post by id', async () => {
        const post = await request(app).get(`/post/${tempPost.id}`);
        expect(post.status).toBe(httpStatus.OK);
        expect(post.body).toBeDefined();
    });
    it('Should create a post', async () => {
        const post = await request(app).post('/post').send(bodyPost);
        expect(post.status).toBe(httpStatus.CREATED);
        expect(post.body).toBeDefined();
    });
    it('Should delete a post', async () => {
        const post = await request(app).delete(`/post/${tempPost.id}`);
        expect(post.status).toBe(httpStatus.OK);
    });
    it('Should return a bad request if trying to create a post with empty body', async () => {
        const post = await request(app).post('/post').send({});
        expect(post.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should return a not found if trying to delete an post with non-existent id', async () => {
        const post = await request(app).delete('/post/100000');
        expect(post.status).toBe(httpStatus.NOT_FOUND);
    });
});
