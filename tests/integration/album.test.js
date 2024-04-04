const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { Album, sequelize } = require('../../src/database/models');

describe('Testing album feature', () => {
    let tempAlbum;
    let bodyAlbum;
    beforeAll(async () => {
        tempAlbum = await Album.create({
            id: 1000,
            description: "Test Album",
            target_id: 1,
            is_active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        bodyAlbum = { 
            description: "Rolê",
            target_id: 1
        };
    });
    afterAll(async () => {
        await Album.destroy({ where: { id: tempAlbum.id } });
        await sequelize.close();
    });
    it('Should return a list of albums', async () => {
        const albums = await request(app).get('/album');
        expect(albums.status).toBe(httpStatus.OK);
        expect(Array.isArray(albums.body)).toBe(true);
        expect(albums.body).toBeDefined();
    });
    it('Should return an album by id', async () => {
        const album = await request(app).get(`/album/${tempAlbum.id}`);
        expect(album.status).toBe(httpStatus.OK);
        expect(album.body).toBeDefined();
    });
    it('Should create an album', async () => {
        const album = await request(app).post('/album').send(bodyAlbum);
        expect(album.status).toBe(httpStatus.CREATED);
        expect(album.body).toBeDefined();
    });
    it('Should delete an album', async () => {
        const album = await request(app).delete(`/album/${tempAlbum.id}`);
        expect(album.status).toBe(httpStatus.OK);
    });
    it('Should not create an album', async () => {
        const album = await request(app).post('/album').send({ });
        expect(album.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should not delete an album', async () => {
        const album = await request(app).delete('/album/100000');
        expect(album.status).toBe(httpStatus.NOT_FOUND);
    });
});
