const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { ReactionType, sequelize } = require('../../src/database/models');

describe('Testing reaction type feature', () => {
    let tempReactionType;
    let bodyReactionType;
    beforeAll(async () => {
        tempReactionType = await ReactionType.create({
            id: 1000,
            description: "test",
            is_active: true
        });
        bodyReactionType = { description: "test" };
    });
    afterAll(async () => {
        await ReactionType.destroy({ where: { id: tempReactionType.id } });
        await sequelize.close();
    });
    it('Should return a list of reaction types', async () => {
        const reactionTypes = await request(app).get('/reactions_type');
        expect(reactionTypes.status).toBe(httpStatus.OK);
        expect(Array.isArray(reactionTypes.body)).toBe(true);
        expect(reactionTypes.body).toBeDefined();
    });
    it('Should create a reaction type', async () => {
        const reactionType = await request(app).post('/reactions_type').send(bodyReactionType);
        expect(reactionType.status).toBe(httpStatus.CREATED);
        expect(reactionType.body).toBeDefined();
    });
    it('Should delete a reaction type', async () => {
        const reactionType = await request(app).delete(`/reactions_type/${tempReactionType.id}`);
        expect(reactionType.status).toBe(httpStatus.OK);
    });
    it('Should not create a reaction type', async () => {
        const reactionType = await request(app).post('/reactions_type').send({});
        expect(reactionType.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should not delete a reaction type', async () => {
        const reactionType = await request(app).delete('/reactions_type/100000');
        expect(reactionType.status).toBe(httpStatus.NOT_FOUND);
    });
});