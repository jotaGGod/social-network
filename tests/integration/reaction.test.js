const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { Reaction, sequelize } = require('../../src/database/models');

describe('Testing reaction feature', () => {
    let tempReaction;
    let bodyReaction;
    beforeAll(async () => {
        tempReaction = await Reaction.create({
            id: 1000,
            user_id: 1,
            reaction_type_id: 1,
            post_id: 3,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        bodyReaction = { 
            user_id: 1,
            reaction_type_id: 2,
            post_id: 3,
         };
    });
    afterAll(async () => {
        await Reaction.destroy({ where: { id: tempReaction.id } });
        await sequelize.close();
    });
    it('Should return a list of reactions', async () => {
        const reactions = await request(app).get('/reactions');
        expect(reactions.status).toBe(httpStatus.OK);
        expect(Array.isArray(reactions.body)).toBe(true);
        expect(reactions.body).toBeDefined();
    });
    it('Should return a reaction by id', async () => {
        const reaction = await request(app).get(`/reactions/${tempReaction.id}`);
        expect(reaction.status).toBe(httpStatus.OK);
        expect(reaction.body).toBeDefined();
    });
    it('Should create a reaction', async () => {
        const reaction = await request(app).post('/reactions').send(bodyReaction);
        expect(reaction.status).toBe(httpStatus.CREATED);
        expect(reaction.body).toBeDefined();
    });
    it('Should delete a reaction', async () => {
        const reaction = await request(app).delete(`/reactions/${tempReaction.id}`);
        expect(reaction.status).toBe(httpStatus.OK);
    });
    it('Should not create a reaction', async () => {
        const reaction = await request(app).post('/reactions').send({});
        expect(reaction.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should not delete a reaction', async () => {
        const reaction = await request(app).delete('/reactions/100000');
        expect(reaction.status).toBe(httpStatus.NOT_FOUND);
    });
});
