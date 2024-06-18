const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const db = require('../../src/database/config/db');
describe('Testing FileType feature', () => {
    let tempFileType;
    let bodyFileTypeCreateTest;
    beforeAll(async () => {
        const [id] = await db('file_type').insert({
            type: 'test',
            is_active: true
        });       
        tempFileType = { id };
        bodyFileTypeCreateTest = { 
            type: 'mp3',
         };
    });
    afterAll(async () => {
        await db('file_type').del();
        await db.destroy();
    });
    it('Should return a list of file types', async () => {
        const fileTypes = await request(app).get('/file_type');
        expect(fileTypes.status).toBe(httpStatus.OK);
        expect(Array.isArray(fileTypes.body)).toBe(true);
        expect(fileTypes.body).toBeDefined();
    });
    it('Should create a file type', async () => {
        const fileType = await request(app).post('/file_type').send(bodyFileTypeCreateTest);
        expect(fileType.status).toBe(httpStatus.CREATED);
        expect(fileType.body).toBeDefined();
    });
    it('Should delete a file type', async () => {
        const fileType = await request(app).delete(`/file_type/${tempFileType.id}`);
        expect(fileType.status).toBe(httpStatus.OK);
    });
    it('Should not create a file type', async () => {
        const fileType = await request(app).post('/file_type').send({});
        expect(fileType.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should not delete a file type', async () => {
        const fileType = await request(app).delete('/file_type/100000');
        expect(fileType.status).toBe(httpStatus.NOT_FOUND);
    });
});
