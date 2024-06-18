const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');
describe('Testing album item feature', () => {
    let tempAlbumItem;
    let bodyAlbumItemCreateTest;
    let tempPost;
    let tempAlbum;
    let tempTarget;
    let tempType;
    let tempUser;
    let loginResponse;

    beforeAll(async () => {
        const [userId] = await db('user').insert({
            id: 1000,
            full_name: 'Mc Carol',
            email: 'carolsobrepeso2000@gmail.com',
            password: '$2b$10$OMDQ.q5dkZAZkQH1g5W6IOP4ZLCwBV4xnTCHDng2pNhlWOpq/n5xO',
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        }) 
        tempUser = await db('user').where({ id: userId }).first(); 

        const [typeId] = await db('file_type').insert({
            id: 1000,
            type: 'test',
            is_active: true
        }) 
        const [targetId] = await db('target_public').insert({
            id: 1000,
            type: "test",
            is_active: true
        })
        const [albumId] = await db('album').insert({
            id: 1000,
            description: "Test Album",
            target_id: targetId,
            is_active: true
        })
        const [postId] = await db('post').insert({
            id: 1000,
            description: "Test Post",
            user_id: userId,
            target_id: targetId,
            type_id: typeId,
            created_at: new Date(),
            updated_at: new Date(),
            is_active: true
        }) 
        const [albumItemId] = await db('album_item').insert({
            post_id: postId,
            album_id: albumId,
            created_at: new Date(),
            updated_at: new Date(),
        })
        tempAlbumItem = { id: albumItemId };
        bodyAlbumItemCreateTest = {
            post_id: postId,
            album_id: albumId
        };
        loginResponse = await request(app).post('/login').send({ email: tempUser.email, password: "1234" });       
    });

    afterAll(async () => {
        await db('token').del();
        await db('album_item').del();
        await db('album').del();
        await db('post').del();
        await db('target_public').del();
        await db('file_type').del();
        await db('user').del();
        await db.destroy();
    });
    it('Should return a list of album items', async () => {
        const { token } = loginResponse.body;
        const albumItems = await request(app).get('/album_item').set('Authorization', token);
        expect(albumItems.status).toBe(httpStatus.OK);
        expect(albumItems.body).toBeDefined();
    });
    it('Should create an album item', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).post('/album_item').send(bodyAlbumItemCreateTest).set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.CREATED);
        expect(albumItem.body).toBeDefined();
    });
    it('Should not create an album item with invalid request body', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).post('/album_item').send({}).set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should delete an album item', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).delete(`/album_item/${tempAlbumItem.id}`).set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.OK);
    });
    it('Should not delete an album item', async () => {
        const { token } = loginResponse.body;
        const albumItem = await request(app).delete('/album_item/100000').set('Authorization', token);
        expect(albumItem.status).toBe(httpStatus.NOT_FOUND);
    });
});
