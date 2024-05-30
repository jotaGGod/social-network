const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { TargetPublic, sequelize } = require('../../database/models');

describe('Testing target public feature', () => {
    let tempTargetPublic;
    let bodyTargetPublic;
    beforeAll(async () => {
        tempTargetPublic = await TargetPublic.create({
            id: 1000,
            type: "test",
            is_active: true
        });
        bodyTargetPublic = { type: "test" };
    });
    afterAll(async () => {
        await TargetPublic.destroy({ where: { id: tempTargetPublic.id } });
        await sequelize.close();
    });
    it('Should return a list of target public', async () => {
        const targetPublic = await request(app).get('/target_public');
        expect(targetPublic.status).toBe(httpStatus.OK);
        expect(Array.isArray(targetPublic.body)).toBe(true);
        expect(targetPublic.body).toBeDefined();
    });
    it('Should create a target public', async () => {
        const targetPublic = await request(app).post('/target_public').send(bodyTargetPublic);
        expect(targetPublic.status).toBe(httpStatus.CREATED);
        expect(targetPublic.body).toBeDefined();
    });
    it('Should delete a target public', async () => {
        const targetPublic = await request(app).delete(`/target_public/${tempTargetPublic.id}`);
        expect(targetPublic.status).toBe(httpStatus.OK);
    });
    it('Should return a internal server error if trying to create a target public with empty body', async () => {
        const targetPublic = await request(app).post('/target_public').send({});
        expect(targetPublic.status).toBe(httpStatus.INTERNAL_SERVER_ERROR);
    });
    it('Should return a not found if trying to delete an target public with non-existent id', async () => {
        const targetPublic = await request(app).delete('/target_public/100000');
        expect(targetPublic.status).toBe(httpStatus.NOT_FOUND);
    });
});
