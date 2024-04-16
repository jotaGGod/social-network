const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { Comment, sequelize } = require('../../src/database/models');

describe('Testing comment feature', () => {
    let tempComment;
    let bodyComment;
    beforeAll(async () => {
        tempComment = await Comment.create({
            id: 1000,
            description: "test",
            user_id: 2,
            post_id: 3,
            createdAt: new Date(),
            updatedAt: new Date(),
            is_active: true
        });
        bodyComment = { 
            description: "test",
            user_id: 2,
            post_id: 3
        };
    });
    afterAll(async () => {
        await Comment.destroy({ where: { id: tempComment.id } });
        await sequelize.close();
    });
    it('Should return a list of comments', async () => {
        const comments = await request(app).get('/comment');
        expect(comments.status).toBe(httpStatus.OK);
        expect(Array.isArray(comments.body)).toBe(true);
        expect(comments.body).toBeDefined();
    });
    it('Should return a comment by id', async () => {
        const comment = await request(app).get(`/comment/${tempComment.id}`);
        expect(comment.status).toBe(httpStatus.OK);
        expect(comment.body).toBeDefined();
    });
    it('Should create a comment', async () => {
        const comment = await request(app).post('/comment').send(bodyComment);
        expect(comment.status).toBe(httpStatus.CREATED);
        expect(comment.body).toBeDefined();
    });
    it('Should delete a comment', async () => {
        const comment = await request(app).delete(`/comment/${tempComment.id}`);
        expect(comment.status).toBe(httpStatus.OK);
    });
    it('Should return a bad request if trying to create a comment with empty body', async () => {
        const comment = await request(app).post('/comment').send({ });
        expect(comment.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should return a not found if trying to delete a comment with non-existent id', async () => {
        const comment = await request(app).delete('/comment/100000');
        expect(comment.status).toBe(httpStatus.NOT_FOUND);
    });
});
