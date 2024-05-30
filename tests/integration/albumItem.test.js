const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { AlbumItem, sequelize } = require('../../database/models');

describe('Testing album item feature', () => {
    let tempAlbumItem;
    let bodyAlbumItem;
    beforeAll(async () => {
        tempAlbumItem = await AlbumItem.create({
            id: 1000,
            post_id: 1,
            album_id: 2,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        bodyAlbumItem = { 
            post_id: 1,
            album_id: 2
        };
    });
    afterAll(async () => {
        await AlbumItem.destroy({ where: { id: tempAlbumItem.id } });
        await sequelize.close();
    });
    it('Should return a list of album items', async () => {
        const albumItems = await request(app).get('/album_item');
        expect(albumItems.status).toBe(httpStatus.OK);
        expect(Array.isArray(albumItems.body)).toBe(true);
        expect(albumItems.body).toBeDefined();
    });
    it('Should create an album item', async () => {
        const albumItem = await request(app).post('/album_item').send(bodyAlbumItem);
        expect(albumItem.status).toBe(httpStatus.CREATED);
        expect(albumItem.body).toBeDefined();
    });
    it('Should delete an album item', async () => {
        const albumItem = await request(app).delete(`/album_item/${tempAlbumItem.id}`);
        expect(albumItem.status).toBe(httpStatus.OK);
    });
    it('Should return a bad request if trying to create a album item with empty body', async () => {
        const albumItem = await request(app).post('/album_item').send({ });
        expect(albumItem.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should return a not found if trying to delete an album item with non-existent id', async () => {
        const albumItem = await request(app).delete('/album_item/100000');
        expect(albumItem.status).toBe(httpStatus.NOT_FOUND);
    });
});
