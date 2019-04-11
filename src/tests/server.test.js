const test = require('tape');
const superTest = require('supertest');
const router = require('../router');

test('Initialise', (t) => {
    let string = 'Guinea Pigs!';
    t.equal(string, 'Guinea Pigs!', 'Should return Guinea Pigs!');
    t.end();
})

test('Home route returns status code of 200', (t) => {
    superTest(router)
    .get("/")
    .expect(200)
    .expect('Content-type', /html/)
    .end((err, res) => {
        t.error(err);
        t.equal(res.statusCode, 200, 'Should be 200');
        t.end();
    });
});