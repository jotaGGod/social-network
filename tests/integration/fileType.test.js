const httpStatus = require('../../src/utils/statusCodes');
const request = require('supertest');
const app = require('../../app');
const { FileType, sequelize } = require('../../src/database/models');

describe('Testing FileType feature', () => {
    let tempFileType;
    let bodyFileType;
    beforeAll(async () => {
        tempFileType = await FileType.create({
            id: 1000,
            type: 'test',
            is_active: true
        });
        bodyFileType = { 
            type: 'mp3',
         };
    });
    afterAll(async () => {
        await FileType.destroy({ where: { id: tempFileType.id } });
        await sequelize.close();
    });
    it('Should return a list of file types', async () => {
        const fileTypes = await request(app).get('/file_type');
        expect(fileTypes.status).toBe(httpStatus.OK);
        expect(Array.isArray(fileTypes.body)).toBe(true);
        expect(fileTypes.body).toBeDefined();
    });
    it('Should create a file type', async () => {
        const fileType = await request(app).post('/file_type').send(bodyFileType);
        expect(fileType.status).toBe(httpStatus.CREATED);
        expect(fileType.body).toBeDefined();
    });
    it('Should delete a file type', async () => {
        const fileType = await request(app).delete(`/file_type/${tempFileType.id}`);
        expect(fileType.status).toBe(httpStatus.OK);
    });
    it('Should return a bad request if trying to create a file type with empty body', async () => {
        const fileType = await request(app).post('/file_type').send({ });
        expect(fileType.status).toBe(httpStatus.BAD_REQUEST);
    });
    it('Should return a not found if trying to delete an file type with non-existent id', async () => {
        const fileType = await request(app).delete('/file_type/100000');
        expect(fileType.status).toBe(httpStatus.NOT_FOUND);
    });
});
