const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { Friendship, sequelize } = require('../../src/database/models');

describe('Testing friendship feature', () => {
    let tempFriendship;
    let bodyFriendship;
    beforeAll(async () => {
        tempFriendship = await Friendship.create({
            id: 1000,
            principal_user_id: 1,
            friend_id: 2,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        });
        bodyFriendship = { 
            principal_user_id: 1,
            friend_id: 2,
         };
    });
    afterAll(async () => {
        await Friendship.destroy({ where: { id: tempFriendship.id } });
        await sequelize.close();
    });
    it('Should return a list of friendships', async () => {
        const friendships = await request(app).get('/friendship');
        expect(friendships.status).toBe(httpStatus.OK);
        expect(Array.isArray(friendships.body)).toBe(true);
        expect(friendships.body).toBeDefined();
    });
    it('Should return a friendship by id', async () => {
        const friendship = await request(app).get(`/friendship/${tempFriendship.id}`);
        expect(friendship.status).toBe(httpStatus.OK);
        expect(friendship.body).toBeDefined();
    });
    it('Should create a friendship', async () => {
        const friendship = await request(app).post('/friendship').send(bodyFriendship);
        expect(friendship.status).toBe(httpStatus.CREATED);
        expect(friendship.body).toBeDefined();
    });
    it('Should delete a friendship', async () => {
        const friendship = await request(app).delete(`/friendship/${tempFriendship.id}`);
        expect(friendship.status).toBe(httpStatus.OK);
    });
    it('Should not create a friendship', async () => {
        const friendship = await request(app).post('/friendship').send({ });
        expect(friendship.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should not delete a friendship', async () => {
        const friendship = await request(app).delete('/friendship/100000');
        expect(friendship.status).toBe(httpStatus.NOT_FOUND);
    });
});
