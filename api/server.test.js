const supertest = require('supertest');
const server = require('./server.js');
const db = require('../data/config.js');

describe('server', () => {
    describe('GET /', () => {
        it('should return HTTP status code 200', () => {
            return supertest(server)
            .get('/')
            .then(res => {
                expect(res.status).toBe(200)
            });
        });
        it('should return JSON', async () => {
            const res = await supertest(server).get('/')
            expect(res.type).toMatch(/json/i);
        })
    })
    describe('POST /family', () => {
        it('should return 201 when passed correct data', () => {
            return supertest(server)
            .post('/family')
            .send({ name: 'randell' })
            .then(res => {
                expect(res.status).toBe(201);
            });
        });
        it('should insert the member into the database', async () => {
            const res = await supertest(server)
            .post('/family')
            .send({ name: 'randell' })

            expect(res.body.data.name).toBe('randell')
        })
    })
    describe('DELETE /family/:id', () => {
        it('should delete a member by id from the database', async () => {
            const id = 2
            const res = await supertest(server)
            .delete(`/family/${id}`)

            expect(res.status).toBe(200);
        })
        it('should have a status code 404 if invalid id', async () => {
            const idd = 100
            const res = await supertest(server)
            .delete(`/family/${idd}`)

            expect(res.status).toBe(404)
        })
    })
})